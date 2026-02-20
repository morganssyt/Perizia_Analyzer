import PublicHeader from '@/components/PublicHeader';

export const metadata = {
  title: 'Termini di Utilizzo – Perizia Analyzer',
  description: 'Condizioni generali di utilizzo del servizio Perizia Analyzer.',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-base font-bold text-slate-900 mb-3">{title}</h2>
      <div className="text-sm text-slate-600 leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      <div className="pt-14">

        {/* Header */}
        <div className="py-16 px-6 border-b border-slate-100">
          <div className="max-w-2xl mx-auto">
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-3">Informativa legale</p>
            <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Termini di Utilizzo</h1>
            <p className="text-slate-500">Ultimo aggiornamento: gennaio 2026</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto px-6 py-16">

          <Section title="1. Accettazione dei termini">
            <p>
              Utilizzando Perizia Analyzer accetti integralmente i presenti Termini di Utilizzo. Se non
              accetti, ti preghiamo di non utilizzare il servizio.
            </p>
          </Section>

          <Section title="2. Descrizione del servizio">
            <p>
              Perizia Analyzer è uno strumento software che utilizza intelligenza artificiale per analizzare
              automaticamente perizie di stima immobiliare in formato PDF. Il servizio estrae e struttura
              informazioni presenti nei documenti caricati dall&apos;utente.
            </p>
          </Section>

          <Section title="3. Limitazione di responsabilità">
            <p>
              <strong>Perizia Analyzer non è un servizio di consulenza legale, finanziaria o immobiliare.</strong>
            </p>
            <p>
              Le analisi prodotte dal sistema sono generate automaticamente da modelli di intelligenza
              artificiale e possono contenere errori, omissioni o imprecisioni. L&apos;utente è l&apos;unico
              responsabile delle decisioni prese sulla base delle informazioni fornite dal servizio.
            </p>
            <p>
              Perizia Analyzer non garantisce l&apos;accuratezza, la completezza o l&apos;idoneità delle
              analisi per scopi specifici. Prima di prendere decisioni di investimento, ti consigliamo di
              consultare professionisti qualificati.
            </p>
          </Section>

          <Section title="4. Utilizzo consentito">
            <p>Puoi utilizzare il servizio per:</p>
            <ul className="list-disc list-inside space-y-1.5 mt-2 ml-2">
              <li>Analizzare perizie immobiliari di tua proprietà o legittimamente in tuo possesso</li>
              <li>Supportare decisioni di investimento immobiliare personale o professionale</li>
              <li>Attività di consulenza legale o immobiliare in ambito professionale</li>
            </ul>
            <p className="mt-3">È vietato:</p>
            <ul className="list-disc list-inside space-y-1.5 mt-2 ml-2">
              <li>Caricare documenti di cui non si ha il diritto di trattamento</li>
              <li>Utilizzare il servizio per attività illecite</li>
              <li>Tentare di accedere a dati di altri utenti o compromettere la sicurezza del sistema</li>
              <li>Rivendere o sublicenziare l&apos;accesso al servizio senza autorizzazione scritta</li>
            </ul>
          </Section>

          <Section title="5. Proprietà intellettuale">
            <p>
              Il software, il design, i testi e i marchi di Perizia Analyzer sono di esclusiva proprietà
              di Perizia Analyzer e sono protetti dalle leggi sul diritto d&apos;autore. È vietata qualsiasi
              riproduzione o uso non autorizzato.
            </p>
            <p>
              I report generati dal sistema a partire dai documenti dell&apos;utente rimangono di proprietà
              dell&apos;utente stesso.
            </p>
          </Section>

          <Section title="6. Account e accesso">
            <p>
              Sei responsabile della sicurezza del tuo account e delle credenziali di accesso. In caso di
              accesso non autorizzato, contattaci immediatamente. Ci riserviamo il diritto di sospendere
              account che violino i presenti termini.
            </p>
          </Section>

          <Section title="7. Piani e pagamenti">
            <p>
              I piani a pagamento sono soggetti ai prezzi indicati nella pagina Pricing. I pagamenti sono
              elaborati da provider terzi certificati. Il piano Pro è mensile e può essere disdetto in
              qualsiasi momento senza penali, con effetto a fine periodo fatturato.
            </p>
          </Section>

          <Section title="8. Modifiche al servizio e ai termini">
            <p>
              Ci riserviamo il diritto di modificare il servizio o i presenti termini in qualsiasi momento.
              Le modifiche sostanziali saranno comunicate via email con almeno 14 giorni di preavviso.
              L&apos;utilizzo continuato del servizio dopo la comunicazione costituisce accettazione delle
              modifiche.
            </p>
          </Section>

          <Section title="9. Legge applicabile">
            <p>
              I presenti termini sono regolati dalla legge italiana. Per qualsiasi controversia è
              competente il Foro di Milano, salvo diversa disposizione di legge inderogabile.
            </p>
          </Section>

          <div className="border-t border-slate-100 pt-8 text-sm text-slate-400">
            <p>
              Per qualsiasi domanda relativa ai presenti termini:{' '}
              <strong className="text-slate-600">legal@perizia-analyzer.app</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


