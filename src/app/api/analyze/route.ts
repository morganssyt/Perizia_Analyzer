/**
 * /api/analyze — Direct PDF extraction via OpenAI Responses API.
 *
 * Pipeline:
 *  1. Accept FormData PDF
 *  2. Upload PDF to OpenAI Files API
 *  3. Single client.responses.create call (model reads PDF natively)
 *  4. Validate JSON with Zod
 *  5. Cleanup uploaded file
 *
 * No rendering, no OCR, no image conversion, no multi-call batching.
 */

// Allow up to 2 minutes on Vercel Pro
export const maxDuration = 120;
export const dynamic     = 'force-dynamic';
export const runtime     = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import OpenAI, { toFile } from 'openai';
import { z } from 'zod';

// ---------------------------------------------------------------------------
// Exported types (consumed by page.tsx)
// ---------------------------------------------------------------------------

export interface Meta {
  analysis_mode:      'text' | 'vision_ocr_2pass' | 'pdf_direct';
  total_pages:        number;
  pages_analyzed:     number;
  pages_list?:        number[];
  reason_for_vision?: string;
  notes?:             string;
  debugDocId?:        string;
}

export interface PageRenderDebug {
  page:         number;
  bytes:        number;
  width:        number;
  height:       number;
  whiteness:    number;
  isBlank:      boolean;
  renderError?: string;
}

export interface OcrPageDebug {
  page:            number;
  chars:           number;
  preview:         string;
  status:          'ok' | 'empty' | 'skipped_blank' | 'rate_limited' | 'error';
  rawModelOutput?: string;
}

export interface DebugInfo {
  totalPages:          number;
  totalChars:          number;
  charsPerPage:        Array<{ page: number; chars: number }>;
  textCoverage:        number;
  isScanDetected:      boolean;
  hitsPerCategory:     Record<string, number>;
  first2000chars:      string;
  last2000chars:       string;
  promptPayloadLength: number;

  textQualityReason?:  string;
  textQualityMetrics?: {
    len: number; avgCharsPerPage: number;
    repetitionScore: number; watermarkHits: number; uniqueTokenRatio: number;
  };

  renderMethod?:      string;
  renderScale?:       number;
  renderJpegQuality?: number;
  renderPages?:       PageRenderDebug[];
  blankPageCount?:    number;
  nonBlankPageCount?: number;

  ocrMethod?:      string;
  ocrPages?:       OcrPageDebug[];
  ocrAvgChars?:    number;
  ocrEscalated?:   boolean;
  expansionPages?: number[];

  reasonForVision?:     string;
  visionPagesAnalyzed?: number[];
  imagesRendered?:      number;
}

interface Citation {
  page:     number;
  snippet:  string;
  keyword?: string;
}

interface Candidate {
  value:       string;
  confidence:  number;
  citations:   Citation[];
  explanation?: string;
}

interface FieldResult {
  status:     'found' | 'not_found' | 'scan_detected';
  confidence: number;
  citations:  Citation[];
  candidates: Candidate[];
}

export type AnalysisResult = {
  valore_perito:    FieldResult & { value:   string | null };
  atti_antecedenti: FieldResult & { summary: string | null };
  costi_oneri:      FieldResult & { summary: string | null };
  difformita:       FieldResult & { summary: string | null };
  riassunto: {
    paragrafo1: string;
    paragrafo2: string;
    paragrafo3: string;
  };
  debug: DebugInfo;
  meta:  Meta;
};

// ---------------------------------------------------------------------------
// Zod schema for model output
// ---------------------------------------------------------------------------

const FieldBaseSchema = z.object({
  status:     z.enum(['found', 'not_found']),
  confidence: z.number().min(0).max(1).default(0.5),
});

const DirectPdfSchema = z.object({
  valore_perito:    FieldBaseSchema.extend({ value:   z.string().nullable() }),
  atti_antecedenti: FieldBaseSchema.extend({ summary: z.string().nullable() }),
  costi_oneri:      FieldBaseSchema.extend({ summary: z.string().nullable() }),
  difformita:       FieldBaseSchema.extend({ summary: z.string().nullable() }),
  riassunto: z.object({
    paragrafo1: z.string(),
    paragrafo2: z.string(),
    paragrafo3: z.string(),
  }),
});

// ---------------------------------------------------------------------------
// System prompt
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `You are a legal real estate auction analyst.
Extract structured data from the provided Italian perizia immobiliare PDF.

Return STRICT JSON in this exact format — no markdown, no extra keys:

{
  "valore_perito": {
    "status": "found"|"not_found",
    "value": "<monetary string>"|null,
    "confidence": <0.0-1.0>
  },
  "atti_antecedenti": {
    "status": "found"|"not_found",
    "summary": "<text>"|null,
    "confidence": <0.0-1.0>
  },
  "costi_oneri": {
    "status": "found"|"not_found",
    "summary": "<text>"|null,
    "confidence": <0.0-1.0>
  },
  "difformita": {
    "status": "found"|"not_found",
    "summary": "<text>"|null,
    "confidence": <0.0-1.0>
  },
  "riassunto": {
    "paragrafo1": "<string>",
    "paragrafo2": "<string>",
    "paragrafo3": "<string>"
  }
}

Rules:
- confidence: 1.0=clear, 0.7=partial, 0.4=uncertain
- if not_found → value/summary must be null
- valore_perito.value must be formatted as e.g. "€ 250.000,00"
- riassunto must be professional, concise, derived only from extracted fields
- ignore watermarks: "Pubblicazione ufficiale", "ASTE GIUDIZIARIE", page numbers`;

// ---------------------------------------------------------------------------
// Exponential backoff retry on 429
// ---------------------------------------------------------------------------

async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelayMs = 2000,
): Promise<T> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === maxRetries) throw err;
      const isRateLimit = err instanceof OpenAI.APIError && err.status === 429;
      if (!isRateLimit) throw err;
      const delay = Math.min(baseDelayMs * Math.pow(2, attempt), 32_000);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  /* istanbul ignore next */
  throw new Error('unreachable');
}

// ---------------------------------------------------------------------------
// Extract text from Responses API output
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractOutputText(response: any): string {
  // Convenience property added in recent SDK versions
  if (typeof response.output_text === 'string') return response.output_text;

  // Manual extraction from output array
  if (Array.isArray(response.output)) {
    return (response.output as unknown[])
      .filter((o): o is { type: string; content: unknown[] } =>
        (o as { type: string }).type === 'message' && Array.isArray((o as { content: unknown[] }).content),
      )
      .flatMap((o) => o.content)
      .filter((c): c is { type: string; text: string } =>
        (c as { type: string }).type === 'output_text' && typeof (c as { text: string }).text === 'string',
      )
      .map((c) => c.text)
      .join('');
  }

  return '';
}

// ---------------------------------------------------------------------------
// Compat helper: sdk <4.30 uses .del(), newer adds .delete() alias
// ---------------------------------------------------------------------------

function deleteFile(client: OpenAI, fileId: string): Promise<unknown> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const files = client.files as any;
  const fn: ((id: string) => Promise<unknown>) | undefined =
    typeof files.delete === 'function' ? files.delete : files.del;
  if (!fn) return Promise.resolve();
  return fn.call(files, fileId);
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

// File size limit: MAX_PDF_MB env var (default 15 MB)
const MAX_BYTES = (parseInt(process.env.MAX_PDF_MB ?? '15', 10) || 15) * 1024 * 1024;

// OpenAI call timeout: ANALYZE_TIMEOUT_MS env var (default 90 s)
const OPENAI_TIMEOUT_MS = parseInt(process.env.ANALYZE_TIMEOUT_MS ?? '90000', 10) || 90_000;

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

function err(requestId: string, message: string, status: number, extra?: Record<string, unknown>) {
  console.error(`[analyze][${requestId}] ${status} — ${message}`, extra ?? '');
  return NextResponse.json({ requestId, error: message, ...extra }, { status });
}

export async function POST(req: NextRequest) {
  const requestId = makeId();
  const t0        = Date.now();
  console.log(`[analyze][${requestId}] START`);

  // Top-level catch so the route ALWAYS returns JSON, never an HTML error page
  try {
    return await handleRequest(req, requestId, t0);
  } catch (e) {
    console.error(`[analyze][${requestId}] UNHANDLED`, e);
    return NextResponse.json(
      { requestId, error: 'Errore interno del server.', detail: String(e) },
      { status: 500 },
    );
  }
}

async function handleRequest(req: NextRequest, requestId: string, t0: number): Promise<NextResponse> {
  // ── Env check ─────────────────────────────────────────────────────────────
  if (!process.env.OPENAI_API_KEY) {
    return err(requestId, 'OPENAI_API_KEY mancante in .env — il server non può chiamare OpenAI.', 500);
  }

  // ── Parse FormData ─────────────────────────────────────────────────────────
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch (e) {
    return err(requestId, 'Richiesta non valida: impossibile leggere il form multipart.', 400, { detail: String(e) });
  }

  const file = formData.get('file') as File | null;
  if (!file) {
    return err(requestId, 'Nessun file fornito nel form (campo "file" mancante).', 400);
  }

  console.log(`[analyze][${requestId}] file="${file.name}" size=${file.size} maxBytes=${MAX_BYTES}`);

  if (file.size > MAX_BYTES) {
    return err(requestId,
      `File troppo grande: ${(file.size / 1024 / 1024).toFixed(1)} MB (limite ${Math.round(MAX_BYTES / 1024 / 1024)} MB). ` +
      `Aumenta MAX_PDF_MB in .env per consentire file più grandi.`,
      413,
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer      = Buffer.from(arrayBuffer);
  const client      = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // ── Upload PDF to OpenAI Files API ────────────────────────────────────────
  console.log(`[analyze][${requestId}] uploading to OpenAI files…`);
  let uploadedFile: OpenAI.FileObject;
  try {
    uploadedFile = await client.files.create({
      file:    await toFile(buffer, file.name || 'perizia.pdf', { type: 'application/pdf' }),
      purpose: 'user_data',
    });
    console.log(`[analyze][${requestId}] uploaded fileId=${uploadedFile.id} (+${Date.now() - t0}ms)`);
  } catch (e) {
    const detail = e instanceof OpenAI.APIError
      ? `OpenAI ${e.status}: ${e.message}`
      : String(e);
    return err(requestId, `Upload del PDF a OpenAI fallito: ${detail}`, 502, { detail });
  }

  // ── Single Responses API call ─────────────────────────────────────────────
  const controller = new AbortController();
  const timeoutId  = setTimeout(() => controller.abort(), OPENAI_TIMEOUT_MS);

  let rawText = '';
  try {
    console.log(`[analyze][${requestId}] calling responses.create (timeout=${OPENAI_TIMEOUT_MS}ms)…`);

    const response = await withRetry(() =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (client as any).responses.create(
        {
          model:        'gpt-4.1-mini',
          instructions: SYSTEM_PROMPT,
          input: [
            {
              role: 'user',
              content: [
                {
                  type: 'input_text',
                  text: 'Analizza questa perizia immobiliare e restituisci SOLO JSON valido nel formato specificato.',
                },
                {
                  type:    'input_file',
                  file_id: uploadedFile.id,
                },
              ],
            },
          ],
          text: { format: { type: 'json_object' } },
        },
        { signal: controller.signal },
      ),
    );

    rawText = extractOutputText(response);
    console.log(`[analyze][${requestId}] responses.create done, rawText.length=${rawText.length} (+${Date.now() - t0}ms)`);
  } catch (e) {
    const isAborted   = e instanceof Error && e.name === 'AbortError';
    const isRateLimit = e instanceof OpenAI.APIError && e.status === 429;
    const detail      = e instanceof OpenAI.APIError
      ? `OpenAI ${e.status}: ${e.message}`
      : String(e);
    await deleteFile(client, uploadedFile.id).catch(() => {});
    if (isAborted) {
      return err(requestId, `Timeout analisi: il modello non ha risposto entro ${OPENAI_TIMEOUT_MS / 1000}s.`, 504, { detail });
    }
    if (isRateLimit) {
      return err(requestId, 'Rate limit OpenAI raggiunto dopo 3 tentativi. Riprova tra qualche minuto.', 429, { detail });
    }
    return err(requestId, `Errore API OpenAI durante l'analisi: ${detail}`, 502, { detail });
  } finally {
    clearTimeout(timeoutId);
  }

  // Cleanup uploaded file (best-effort, non-blocking)
  deleteFile(client, uploadedFile.id).catch(() => {});

  if (!rawText.trim()) {
    return err(requestId, 'Risposta OpenAI vuota: il modello non ha restituito testo. Riprova.', 502);
  }

  // ── Parse JSON ─────────────────────────────────────────────────────────────
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    return err(requestId, 'Risposta OpenAI non era JSON valido.', 502, { raw: rawText.slice(0, 500) });
  }

  // ── Validate with Zod ─────────────────────────────────────────────────────
  const validation = DirectPdfSchema.safeParse(parsed);
  if (!validation.success) {
    return err(requestId, 'Schema risposta non valido (campi mancanti o tipo errato).', 502, {
      issues: validation.error.issues,
      raw:    parsed,
    });
  }

  const data = validation.data;

  // ── Build response ─────────────────────────────────────────────────────────
  const debug: DebugInfo = {
    totalPages:          0,
    totalChars:          0,
    charsPerPage:        [],
    textCoverage:        0,
    isScanDetected:      false,
    hitsPerCategory:     {},
    first2000chars:      '',
    last2000chars:       '',
    promptPayloadLength: 0,
  };

  const meta: Meta = {
    analysis_mode:  'pdf_direct',
    total_pages:    0,
    pages_analyzed: 0,
    notes:          'Analisi PDF diretta (no OCR pipeline)',
  };

  const result: AnalysisResult = {
    valore_perito:    { ...data.valore_perito,    citations: [], candidates: [] },
    atti_antecedenti: { ...data.atti_antecedenti, citations: [], candidates: [] },
    costi_oneri:      { ...data.costi_oneri,      citations: [], candidates: [] },
    difformita:       { ...data.difformita,        citations: [], candidates: [] },
    riassunto:        data.riassunto,
    debug,
    meta,
  };

  console.log(`[analyze][${requestId}] OK total=${Date.now() - t0}ms`);
  return NextResponse.json({ requestId, ...result });
}
