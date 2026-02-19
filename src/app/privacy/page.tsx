import Link from 'next/link';
import PublicHeader from '@/components/PublicHeader';

export const metadata = {
  title: 'Privacy Policy – Perizia Analyzer',
  description: 'Informativa sul trattamento dei dati personali.',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h2 className="text-lg font-bold text-slate-900 mb-4">{title}</h2>
      <div className="text-sm text-slate-600 leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      <div className="pt-14">

        {/* Header */}
        <div className="py-16 px-6 border-b border-slate-100">
          <div className="max-w-2xl mx-auto">
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-3">Informativa legale</p>
            <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Privacy Policy</h1>
            <p className="text-slate-500">Ultimo aggiornamento: gennaio 2026</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto px-6 py-16">

          <Section title="1. Titolare del trattamento">
            <p>
              Il titolare del trattamento è Perizia Analyzer, con sede in Italia. Per qualsiasi richiesta
              relativa alla privacy puoi scrivere a: <strong>privacy@perizia-analyzer.app</strong>
            </p>
          </Section>

          <Section title="2. Dati raccolti">
            <p>Raccogliamo i seguenti dati:</p>
            <ul className="list-disc list-inside space-y-1.5 mt-2 ml-2">
              <li>
                <strong>Dati account:</strong> nome, indirizzo email, password (cifrata). Forniti al momento
                della registrazione.
              </li>
              <li>
                <strong>File caricati:</strong> i PDF delle perizie che carichi per l&apos;analisi.
              </li>
              <li>
                <strong>Dati di utilizzo:</strong> log tecnici anonimi (errori, tempi di risposta) per il
                miglioramento del servizio.
              </li>
            </ul>
          </Section>

          <Section title="3. Trattamento dei file caricati">
            <p>
              I PDF che carichi vengono trasmessi ai nostri sistemi esclusivamente per l&apos;elaborazione
              richiesta. Il trattamento avviene in modo automatico tramite modelli di intelligenza artificiale.
            </p>
            <p>
              <strong>I file non vengono conservati dopo l&apos;elaborazione.</strong> Al termine
              dell&apos;analisi, il file viene eliminato dai nostri server e dai sistemi di terze parti
              (OpenAI) immediatamente. Non condividiamo i tuoi documenti con terzi per scopi commerciali o di
              addestramento.
            </p>
            <p>
              Puoi richiedere la cancellazione di tutti i dati associati al tuo account in qualsiasi momento
              dalla sezione <Link href="/account" className="text-blue-700 hover:underline">Account</Link>.
            </p>
          </Section>

          <Section title="4. Base giuridica del trattamento">
            <p>Il trattamento dei dati si basa su:</p>
            <ul className="list-disc list-inside space-y-1.5 mt-2 ml-2">
              <li>
                <strong>Esecuzione del contratto:</strong> per fornirti il servizio di analisi.
              </li>
              <li>
                <strong>Interesse legittimo:</strong> per il miglioramento del servizio tramite log tecnici
                anonimi.
              </li>
              <li>
                <strong>Consenso:</strong> per comunicazioni marketing, se esplicitamente accettate.
              </li>
            </ul>
          </Section>

          <Section title="5. Conservazione dei dati">
            <p>
              I dati account vengono conservati per tutta la durata del rapporto contrattuale e per 12 mesi
              successivi alla sua conclusione, salvo obblighi di legge.
            </p>
            <p>
              I file PDF vengono eliminati immediatamente dopo l&apos;elaborazione e non vengono conservati.
            </p>
            <p>
              Puoi richiedere la cancellazione anticipata del tuo account e di tutti i dati associati
              inviando una email a <strong>privacy@perizia-analyzer.app</strong>.
            </p>
          </Section>

          <Section title="6. Sicurezza">
            <p>Adottiamo le seguenti misure di sicurezza:</p>
            <ul className="list-disc list-inside space-y-1.5 mt-2 ml-2">
              <li>Crittografia in transito (HTTPS/TLS 1.3)</li>
              <li>Hosting su infrastrutture con certificazioni di sicurezza (UE)</li>
              <li>Accesso ai dati limitato al personale autorizzato</li>
              <li>Nessuna conservazione dei file caricati dopo l&apos;elaborazione</li>
            </ul>
          </Section>

          <Section title="7. Condivisione con terze parti">
            <p>
              Per fornire il servizio utilizziamo OpenAI (USA) per l&apos;elaborazione AI dei documenti. Il
              trasferimento avviene nel rispetto delle garanzie previste dal GDPR (Clausole Contrattuali
              Standard). I dati non vengono condivisi per finalità di marketing o ceduti a terzi.
            </p>
            <p>
              Per la gestione dei pagamenti utilizziamo provider certificati PCI-DSS. Perizia Analyzer non
              accede né conserva i dati della tua carta di credito.
            </p>
          </Section>

          <Section title="8. Cookie">
            <p>
              Utilizziamo solo cookie tecnici strettamente necessari al funzionamento del servizio
              (autenticazione, preferenze di sessione). Non utilizziamo cookie di profilazione o tracking
              di terze parti.
            </p>
          </Section>

          <Section title="9. I tuoi diritti (GDPR)">
            <p>In qualità di interessato hai diritto a:</p>
            <ul className="list-disc list-inside space-y-1.5 mt-2 ml-2">
              <li><strong>Accesso:</strong> ottenere copia dei tuoi dati personali</li>
              <li><strong>Rettifica:</strong> correggere dati inesatti</li>
              <li><strong>Cancellazione:</strong> richiedere la rimozione dei tuoi dati</li>
              <li><strong>Portabilità:</strong> ricevere i dati in formato strutturato</li>
              <li><strong>Opposizione:</strong> opporti al trattamento basato su interesse legittimo</li>
              <li><strong>Limitazione:</strong> richiedere la sospensione temporanea del trattamento</li>
            </ul>
            <p className="mt-3">
              Per esercitare i tuoi diritti scrivi a <strong>privacy@perizia-analyzer.app</strong>.
              Risponderemo entro 30 giorni.
            </p>
          </Section>

          <Section title="10. Reclami">
            <p>
              Hai il diritto di presentare un reclamo all&apos;autorità di controllo competente. In Italia:
              Garante per la Protezione dei Dati Personali (<a
                href="https://www.garanteprivacy.it"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline"
              >
                garanteprivacy.it
              </a>).
            </p>
          </Section>

          <div className="border-t border-slate-100 pt-8 text-sm text-slate-400">
            <p>
              Per qualsiasi domanda: <strong className="text-slate-600">privacy@perizia-analyzer.app</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


