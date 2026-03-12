'use client';

import { DictionaryContext, LocaleContext } from '@/app/providers';
import { clsx } from 'clsx';
import Link from 'next/link';
import { use } from 'react';

const MailTemplatesPage = () => {
  const dictionary = use(DictionaryContext);
  const locale = use(LocaleContext);

  return (
    <main className={clsx('mx-auto flex min-h-screen max-w-5xl flex-col gap-4 px-6 py-16')}>
      <Link href={`/${locale}`} className={clsx('text-sm font-medium text-emerald-700 hover:text-emerald-800')}>
        {dictionary?.backToHome}
      </Link>
      <h1 className={clsx('text-3xl font-semibold tracking-tight text-slate-900')}>
        {dictionary?.editorMailTemplatesTitle}
      </h1>
      <p className={clsx('text-sm text-slate-600')}>
        {dictionary?.comingSoonPrefix} {dictionary?.editorMailTemplatesDescription}
      </p>
    </main>
  );
};

export default MailTemplatesPage;

