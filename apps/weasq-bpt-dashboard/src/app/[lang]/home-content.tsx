'use client';

import { DictionaryContext, LocaleContext } from '@/app/providers';
import { clsx } from 'clsx';
import { type Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { use } from 'react';

export const HomeContent = () => {
  const locale = use(LocaleContext);
  const dictionary = use(DictionaryContext);
  const { data: sessionData }: { data: Session | null } = useSession();

  return (
    <main className={clsx('mx-auto', 'flex', 'min-h-screen', 'max-w-5xl', 'flex-col', 'gap-8', 'px-6', 'py-16')}>
      <header className={clsx('space-y-3')}>
        <p className={clsx('text-sm', 'font-medium', 'tracking-widest', 'text-cyan-400', 'uppercase')}>weasQ</p>
        <h1 className={clsx('text-4xl', 'font-semibold', 'tracking-tight', 'text-white', 'sm:text-5xl')}>
          BPT dashboard
        </h1>
      </header>

      <section className={clsx('rounded-2xl', 'border', 'border-slate-800', 'bg-slate-900/70', 'p-6', 'space-y-2')}>
        <p className={clsx('text-sm', 'text-slate-300')}>Locale: {locale}</p>
        <p className={clsx('text-sm', 'text-slate-300')}>Dictionary `yes`: {dictionary?.yes}</p>
        <p className={clsx('text-sm', 'text-slate-300')}>Session: {sessionData ? 'authenticated' : 'anonymous'}</p>
      </section>
    </main>
  );
};
