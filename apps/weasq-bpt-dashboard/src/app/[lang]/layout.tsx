import LayoutShell from '@/app/[lang]/layout-shell';
import { getDictionary } from '@/app/dictionaries';
import { Providers } from '@/app/providers';
import { locales, type Locale } from '@/types/globals';
import { Login } from '@weasq/weasq-auth/login';
import { createKeycloakAuthOptions } from '@weasq/weasq-auth/server';
import { SessionGuard } from '@weasq/weasq-auth/session-guard';
import type { Session } from 'next-auth';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

type LangLayoutProps = {
  children: ReactNode;
  params: Promise<{ lang: string }>;
};

export const generateStaticParams = () => {
  return locales.map((lang) => ({ lang }));
};

const isLocale = (value: string): value is Locale => {
  return locales.includes(value as Locale);
};

const LangLayout = async ({ children, params }: LangLayoutProps): Promise<ReactNode> => {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);
  const session: Session | null = await getServerSession(createKeycloakAuthOptions());

  return (
    <Providers locale={lang} dictionary={dictionary}>
      <SessionGuard>{session ? <LayoutShell locale={lang}>{children}</LayoutShell> : <Login />}</SessionGuard>
    </Providers>
  );
};

export default LangLayout;
