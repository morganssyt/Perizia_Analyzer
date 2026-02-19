import Link from 'next/link';
import PublicHeader from '@/components/PublicHeader';

export const metadata = {
  title: 'Chi siamo – Perizia Analyzer',
  description: 'Perizia Analyzer: lo strumento AI per analizzare perizie immobiliari d\'asta in 30 secondi.',
};

const VALUES = [
  {
    title: 'Semplicità',
    desc: 'Carica un PDF, ottieni un risultato strutturato. Nessuna configurazione, nessun manuale. La complessità è nascosta dove deve stare: dentro.',
  },
  {
    title: 'Chiarezza',
    desc: 'I dati estratti sono presentati in modo diretto: valore, rischi, costi, atti. Un esito semaforo per decidere in un colpo d\'occhio.',
  },
  {
    title: 'Decisione',
    desc: 'Lo strumento non sostituisce il tuo giudizio, lo supporta. Hai tutti i dati rilevanti organizzati davanti a te. La scelta finale è tua.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      <div className="pt-14">

        {/* Hero */}
        <section className="py-20 px-6 border-b border-slate-100">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-4">Chi siamo</p>
            <h1 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
              Riduciamo il rischio
              <br />
              nelle aste immobiliari.
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
              Perizia Analyzer nasce da una domanda semplice: perché analizzare una perizia d&apos;asta
              richiede ancora ore di lavoro manuale su decine di pagine di testo tecnico?
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-5">Il prodotto</h2>
                <p className="text-slate-500 leading-relaxed mb-4">
                  Perizia Analyzer è uno strumento AI che analizza automaticamente le perizie di stima
                  immobiliare prodotte dai tribunali italiani per le procedure di asta giudiziaria.
                </p>
                <p className="text-slate-500 leading-relaxed mb-4">
                  In 30 secondi estrae i dati chiave: il valore stimato dal perito, i costi e gli oneri
                  a carico dell&apos;acquirente, le difformità urbanistiche o catastali, e gli atti
                  giuridici precedenti che gravano sull&apos;immobile.
                </p>
                <p className="text-slate-500 leading-relaxed">
                  Il risultato è un report strutturato con un esito semaforo (Verde / Giallo / Rosso)
                  che permette di valutare rapidamente la convenienza e i rischi di ogni immobile.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-5">Per chi è</h2>
                <ul className="space-y-4">
                  {[
                    {
                      title: 'Investitori immobiliari',
                      desc: 'Che seguono più aste contemporaneamente e devono valutare rapidamente ogni opportunità.',
                    },
                    {
                      title: 'Avvocati e consulenti',
                      desc: "Che assistono clienti nelle procedure d'asta e necessitano di una prima analisi strutturata.",
                    },
                    {
                      title: 'Privati alle prime aste',
                      desc: "Che si avvicinano alle aste giudiziarie e vogliono capire cosa c'è scritto in una perizia.",
                    },
                  ].map((item) => (
                    <li key={item.title} className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-700 mt-2 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
                        <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-6 bg-slate-50 border-y border-slate-100">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-12">Il nostro approccio</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {VALUES.map((v) => (
                <div key={v.title}>
                  <h3 className="font-bold text-slate-900 mb-3">{v.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Limitations */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8">
              <h2 className="font-bold text-amber-800 mb-3">Una precisazione importante</h2>
              <p className="text-sm text-amber-700 leading-relaxed">
                Perizia Analyzer è uno strumento di supporto alla decisione, non un servizio di consulenza
                legale o finanziaria. Le analisi prodotte sono basate su intelligenza artificiale e possono
                contenere errori o omissioni. Prima di partecipare a un&apos;asta immobiliare, ti consigliamo
                di consultare un professionista qualificato (avvocato, geometra, perito) per una valutazione
                completa e vincolante.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contatti" className="py-20 px-6 bg-slate-50 border-t border-slate-100">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Contatti</h2>
            <p className="text-slate-500 mb-8">
              Per domande, feedback o richieste commerciali, scrivici.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-slate-600">
                <span className="font-medium">Supporto generale:</span>
                <span className="text-blue-700">supporto@perizia-analyzer.app</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-slate-600">
                <span className="font-medium">Privacy e dati:</span>
                <span className="text-blue-700">privacy@perizia-analyzer.app</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-slate-600">
                <span className="font-medium">Piano Studio e partnership:</span>
                <span className="text-blue-700">business@perizia-analyzer.app</span>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="px-8 py-3 bg-blue-700 text-white text-sm font-semibold rounded-xl hover:bg-blue-800 transition-colors"
              >
                Prova gratis
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-3 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors"
              >
                Vedi i piani
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}


