'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getHistory, getEsitoFromResult, formatDate } from '@/lib/history';

type EsitoType = 'verde' | 'giallo' | 'rosso';

const ESITO_MAP: Record<EsitoType, { label: string; cls: string }> = {
  verde: { label: 'Verde', cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  giallo: { label: 'Da verificare', cls: 'bg-amber-50 text-amber-700 border border-amber-200' },
  rosso: { label: 'Rischi', cls: 'bg-red-50 text-red-700 border border-red-200' },
};

const QUICK_ACCESS = [
  {
    href: '/app/analyze',
    label: 'Analizza',
    desc: 'Nuova perizia',
    primary: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    href: '/app/dashboard',
    label: 'Dashboard',
    desc: 'Panoramica',
    primary: false,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: '/app/reports',
    label: 'Report',
    desc: 'Storico analisi',
    primary: false,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586l5.414 5.414V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    href: '/app/account',
    label: 'Account',
    desc: 'Profilo e piano',
    primary: false,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

const VALUE_BULLETS = [
  'Carica il PDF, ottieni rischi e valore stimato in 30 secondi',
  'Esito semaforo immediato: Verde, Giallo o Rosso',
  'Export del report per le tue decisioni di investimento',
];

export default function AppHomePage() {
  const [name, setName] = useState('');
  const [recent, setRecent] = useState<Array<{
    id: string; fileName: string; analyzedAt: string; esito: EsitoType;
  }>>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('pa_user');
      if (raw) {
        const u = JSON.parse(raw);
        setName(u.name?.split(' ')[0] ?? '');
      }
    } catch { /* ok */ }

    const history = getHistory().slice(0, 3);
    setRecent(history.map((e) => ({
      id: e.id,
      fileName: e.fileName,
      analyzedAt: e.analyzedAt,
      esito: getEsitoFromResult(e.result),
    })));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-14">

      {/* Hero */}
      <div className="mb-14">
        <p className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-3">
          Area riservata
        </p>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-3">
          {name ? `Ciao, ${name}.` : 'Bentornato.'}
        </h1>
        <p className="text-lg text-slate-500 mb-8">
          Pronto ad analizzare una nuova perizia?
        </p>
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <Link
            href="/app/analyze"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors"
          >
            Analizza ora
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/app/dashboard"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors"
          >
            Vai alla dashboard
          </Link>
        </div>
      </div>

      {/* Quick access */}
      <div className="mb-14">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
          Accesso rapido
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {QUICK_ACCESS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-2.5 py-7 rounded-2xl border transition-all hover:shadow-sm ${
                item.primary
                  ? 'bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700'
                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-500'
              }`}
            >
              {item.icon}
              <div className="text-center">
                <p className={`text-sm font-semibold ${item.primary ? 'text-blue-700' : 'text-slate-700'}`}>
                  {item.label}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent analyses */}
      <div className="mb-14">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            Ultime analisi
          </p>
          {recent.length > 0 && (
            <Link href="/app/reports" className="text-sm text-blue-700 hover:text-blue-800 font-medium transition-colors">
              Vedi tutte →
            </Link>
          )}
        </div>

        {recent.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-2xl p-10 text-center">
            <p className="text-sm text-slate-400 mb-3">Nessuna analisi ancora.</p>
            <Link href="/app/analyze" className="text-sm text-blue-700 font-medium hover:underline">
              Inizia la tua prima analisi →
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {recent.map((entry) => {
              const esito = ESITO_MAP[entry.esito];
              return (
                <Link
                  key={entry.id}
                  href={`/app/report/${entry.id}`}
                  className="flex items-center gap-4 bg-white border border-slate-100 rounded-xl px-5 py-4 hover:border-slate-200 hover:shadow-sm transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586l5.414 5.414V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{entry.fileName}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{formatDate(entry.analyzedAt)}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${esito.cls}`}>
                    {esito.label}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Value reminder */}
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
          Perché usare Perizia Analyzer
        </p>
        <ul className="space-y-3">
          {VALUE_BULLETS.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <svg className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-slate-600">{b}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
