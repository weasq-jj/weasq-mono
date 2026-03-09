'use client';

import { type Dictionary } from '@/app/dictionaries';
import { type Locale } from '@/types/globals';
import { Providers as AuthProviders } from '@weasq/weasq-auth/providers';
import { createContext, type ReactNode } from 'react';

export const LocaleContext = createContext<Locale | null>(null);
export const DictionaryContext = createContext<Dictionary | null>(null);

interface ProvidersProps {
  children: ReactNode;
  dictionary: Dictionary;
  locale: Locale;
}

export const Providers = ({ children, dictionary, locale }: ProvidersProps) => {
  return (
    <AuthProviders>
      <DictionaryContext value={dictionary}>
        <LocaleContext value={locale}>{children}</LocaleContext>
      </DictionaryContext>
    </AuthProviders>
  );
};
