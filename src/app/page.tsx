'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PublicHeader from '@/components/PublicHeader';

// ─── Product mockup ────────────────────────────────────────────────────────────

function ProductMockup() {
  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
          </div>
          <div className="flex-1 mx-3 bg-white border border-slate-200 rounded-md px-3 py-1 text-xs text-slate-400 truncate">
            perizia-analyzer.app/app/analyze
          </div>
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-700 rounded-md" />
            <span className="text-xs font-semibold text-slate-700">Perizia Analyzer</span>
          </div>
          <div className="flex gap-3 text-xs text-slate-400">
            <span>Dashboard</span>
            <span className="text-blue-700 font-medium">Analizza</span>
            <span>Report</span>
          </div>
        </div>
        <div className="p-5 grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="border border-blue-200 bg-blue-50 rounded-xl p-3 flex items-center gap-2.5">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586l5.414 5.414V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-700 truncate">perizia_asta_2024.pdf</p>
                <p className="text-xs text-slate-400">4.2 MB · PDF caricato</p>
              </div>
            </div>
            <div className="border border-green-200 bg-green-50 rounded-xl p-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-600">Esito generale</span>
                <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Verde</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">Perizia regolare. Nessuna difformità critica.</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Valore Perito', value: '€ 320.000', color: 'text-slate-900' },
                { label: 'Costi e Oneri', value: 'Trovati', color: 'text-amber-600' },
                { label: 'Atti Prec.', value: 'Nessuno', color: 'text-green-600' },
                { label: 'Difformità', value: 'Nessuna', color: 'text-green-600' },
              ].map((item) => (
                <div key={item.label} className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                  <p className="text-xs text-slate-400 mb-0.5">{item.label}</p>
                  <p className={`text-sm font-semibold ${item.color}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
              <p className="text-xs font-semibold text-blue-700 mb-2">Riassunto Operativo</p>
              <div className="space-y-2">
                {[
                  'Appartamento stimato €320.000, libero da ipoteche rilevanti.',
                  'Presenza di oneri condominiali arretrati da verificare.',
                  "Procedere con verifica catastale prima dell'offerta.",
                ].map((text, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-200 text-blue-800 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <p className="text-xs text-slate-600 leading-snug">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <button className="w-full bg-blue-700 text-white text-xs font-medium py-2 rounded-lg">
              Esporta report →
            </button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 blur-3xl opacity-20 bg-blue-400 rounded-full scale-75 translate-y-8" />
    </div>
  );
}

// ─── Public landing ────────────────────────────────────────────────────────────

function PublicLanding() {
  return (
    <div className="bg-white">
      <PublicHeader />

      {/* Hero */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-blue-100">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Analisi AI in tempo reale
            </div>
            <h1 className="text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
              Analizza una perizia d&apos;asta
              <br />
              <span className="text-blue-700">in 30 secondi.</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed mb-10">
              Carica il PDF. Ottieni rischi, costi nascosti e valore reale.
              <br />
              Lo strumento decisionale per investitori immobiliari professionali.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/signup" className="px-8 py-3.5 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors text-base">
                Prova gratis
              </Link>
              <Link href="/#come-funziona" className="px-8 py-3.5 bg-white text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors text-base border border-slate-200">
                Scopri come funziona
              </Link>
            </div>
            <p className="text-xs text-slate-400 mt-4">Nessuna carta di credito. 1 analisi gratuita.</p>
          </div>
          <ProductMockup />
        </div>
      </section>

      {/* Come funziona */}
      <section id="come-funziona" className="py-24 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Come funziona</h2>
            <p className="text-slate-500">Tre passaggi. Trenta secondi. Una decisione chiara.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Carica la perizia', desc: 'Scarica il PDF dal portale aste (PVP, Aste Giudiziarie). Trascinalo nella piattaforma.' },
              { step: '02', title: "L'AI analizza", desc: "Il modello legge l'intero documento ed estrae i dati rilevanti: valore, rischi, oneri, difformità." },
              { step: '03', title: 'Decidi con certezza', desc: 'Ottieni un report strutturato con esito semaforo, dati chiave ed export per le tue analisi.' },
            ].map((item) => (
              <div key={item.step}>
                <div className="text-6xl font-bold text-slate-100 mb-3 select-none">{item.step}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cosa ottieni */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Cosa ottieni</h2>
            <p className="text-slate-500">I dati che contano, senza doverli cercare tu.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: 'Valore del perito', desc: "Il valore stimato dall'esperto. Il riferimento per valutare la convenienza rispetto alla base d'asta." },
              { title: 'Rischi e difformità', desc: 'Irregolarità urbanistiche, catastali ed edilizie che possono bloccare la compravendita o richiedere costi.' },
              { title: 'Costi e oneri', desc: 'Spese condominiali arretrate, oneri fiscali e altri costi a carico del futuro acquirente.' },
              { title: 'Atti precedenti', desc: "Compravendite, ipoteche e successioni che gravano sull'immobile, estratti automaticamente." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-6 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors bg-white">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-blue-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Confronto */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Perizia PDF vs Software</h2>
            <p className="text-slate-500">Quello che fai in 4 ore, lo fai in 30 secondi.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="text-sm font-semibold text-slate-400 mb-5 uppercase tracking-wide">Senza software</div>
              <ul className="space-y-3">
                {['Leggi 60+ pagine da cima a fondo', 'Cerchi manualmente valori e rischi', 'Rischio di perdere clausole critiche', 'Nessuna struttura. Solo testo.', '3–4 ore per perizia'].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-500">
                    <svg className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-700 rounded-2xl p-6">
              <div className="text-sm font-semibold text-blue-200 mb-5 uppercase tracking-wide">Con Perizia Analyzer</div>
              <ul className="space-y-3">
                {['Carica il PDF. Click su Analizza.', 'Tutti i dati chiave estratti in automatico', 'Esito semaforo immediato (Verde/Giallo/Rosso)', 'Report strutturato pronto per decidere', '30 secondi per perizia'].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white">
                    <svg className="w-4 h-4 text-blue-300 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Semplice. Trasparente.</h2>
          <p className="text-slate-500 mb-12">Inizia gratis. Passa a Pro quando sei pronto.</p>
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              { name: 'Free', price: '0', note: 'Per iniziare', highlight: false },
              { name: 'Pro', price: '29', note: 'al mese', highlight: true },
              { name: 'Studio', price: '79', note: 'al mese', highlight: false },
            ].map((plan) => (
              <div key={plan.name} className={`rounded-2xl p-6 text-center ${plan.highlight ? 'bg-blue-700' : 'bg-white border border-slate-200'}`}>
                <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${plan.highlight ? 'text-blue-200' : 'text-slate-400'}`}>{plan.name}</p>
                <div className="flex items-end justify-center gap-1 mb-1">
                  <span className={`text-3xl font-bold ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>€{plan.price}</span>
                  {plan.price !== '0' && <span className={`text-sm mb-1 ${plan.highlight ? 'text-blue-200' : 'text-slate-400'}`}>/mese</span>}
                </div>
                <p className={`text-xs ${plan.highlight ? 'text-blue-200' : 'text-slate-400'}`}>{plan.note}</p>
              </div>
            ))}
          </div>
          <Link href="/pricing" className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-800 transition-colors">
            Vedi tutti i dettagli
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* CTA finale */}
      <section className="py-28 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Inizia con la tua prima perizia.</h2>
          <p className="text-lg text-slate-500 mb-10">
            Nessuna registrazione obbligatoria. Nessuna carta di credito.
            <br />
            Una perizia gratuita per valutare il software.
          </p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-10 py-4 bg-blue-700 text-white text-base font-semibold rounded-xl hover:bg-blue-800 transition-colors">
            Analizza la tua prima perizia
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <p className="text-xs text-slate-400 mt-4">Già 500+ investitori professionali lo usano ogni settimana.</p>
        </div>
      </section>
    </div>
  );
}

// ─── Root: redirect to /app if authenticated, else show public landing ─────────

export default function RootPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      const user = localStorage.getItem('pa_user');
      if (user) {
        router.replace('/app');
        return;
      }
    } catch { /* ok */ }
    setChecked(true);
  }, [router]);

  if (!checked) return <div className="min-h-screen bg-white" />;

  return <PublicLanding />;
}
