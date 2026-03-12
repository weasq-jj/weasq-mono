'use client';

import { DictionaryContext, LocaleContext } from '@/app/providers';
import { clsx } from 'clsx';
import Link from 'next/link';
import { use } from 'react';

export const HomeContent = () => {
  const locale = use(LocaleContext);
  const dictionary = use(DictionaryContext);
  const editorLinks = [
    {
      href: `/${locale}/tags`,
      title: dictionary?.editorTagsTitle,
      description: dictionary?.editorTagsDescription,
    },
    {
      href: `/${locale}/questions`,
      title: dictionary?.editorQuestionsTitle,
      description: dictionary?.editorQuestionsDescription,
    },
    {
      href: `/${locale}/mail-templates`,
      title: dictionary?.editorMailTemplatesTitle,
      description: dictionary?.editorMailTemplatesDescription,
    },
    {
      href: `/${locale}/surveys`,
      title: dictionary?.editorSurveyCreationTitle,
      description: dictionary?.editorSurveyCreationDescription,
    },
    {
      href: `/${locale}/surveys/overview`,
      title: dictionary?.editorSurveyOverviewTitle,
      description: dictionary?.editorSurveyOverviewDescription,
    },
  ];

  return (
    <main className={clsx('mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-6 py-16')}>
      <header className={clsx('space-y-3')}>
        <p className={clsx('text-sm font-medium tracking-widest text-emerald-600 uppercase')}>weasQ</p>
        <h1 className={clsx('text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl')}>
          {dictionary?.appTitle}
        </h1>
      </header>

      <section className={clsx('space-y-4')}>
        <h2 className={clsx('text-xl font-semibold tracking-tight text-slate-900')}>{dictionary?.editorMenuTitle}</h2>
        <p className={clsx('text-sm text-slate-600')}>{dictionary?.editorMenuDescription}</p>
        <nav className={clsx('grid gap-3 sm:grid-cols-2')} aria-label={dictionary?.editorMenuTitle}>
          {editorLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                'group rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-emerald-400 hover:bg-emerald-50/40',
              )}
            >
              <p className={clsx('text-sm font-semibold text-slate-900 group-hover:text-emerald-700')}>{link.title}</p>
              <p className={clsx('mt-1 text-sm text-slate-600')}>{link.description}</p>
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
};
