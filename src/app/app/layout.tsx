'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AppNav from '@/components/ui/AppNav';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const user = localStorage.getItem('pa_user');
      if (!user) {
        router.replace('/login');
        return;
      }
    } catch { /* ok */ }
    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <AppNav />
      <main className="pt-14 min-h-screen bg-slate-50">{children}</main>
    </>
  );
}
