'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/app/dashboard', label: 'Dashboard' },
  { href: '/app/analyze', label: 'Analizza' },
  { href: '/app/reports', label: 'Report' },
  { href: '/app/account', label: 'Account' },
];

const LogoIcon = () => (
  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export default function AppNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    try { localStorage.removeItem('pa_user'); } catch { /* ok */ }
    router.push('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 h-14 no-print">
      <div className="h-full max-w-7xl mx-auto px-6 flex items-center gap-8">

        {/* Logo → /app (private home) */}
        <Link
          href="/app"
          className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity"
        >
          <div className="w-7 h-7 bg-blue-700 rounded-lg flex items-center justify-center">
            <LogoIcon />
          </div>
          <span className="font-semibold text-slate-900 text-sm tracking-tight">Perizia Analyzer</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-0.5 flex-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (pathname.startsWith(item.href + '/'));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right */}
        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/app/analyze"
            className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 bg-blue-700 text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nuova analisi
          </Link>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 text-sm font-medium text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Esci
          </button>
        </div>
      </div>
    </header>
  );
}
