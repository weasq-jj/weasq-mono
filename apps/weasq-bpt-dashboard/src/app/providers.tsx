'use client';

import { type Dictionary } from '@/app/dictionaries';
import { type Locale } from '@/types/globals';
import { Providers as AuthProviders } from '@weasq/weasq-auth/providers';
import { DictionaryContext, LocaleContext } from '@weasq/weasq-ui';
import { type ReactNode } from 'react';

export { DictionaryContext, LocaleContext };

type ProvidersProps = {
  children: ReactNode;
  dictionary: Dictionary;
  locale: Locale;
};

export const Providers = ({ children, dictionary, locale }: ProvidersProps) => {
  return (
    <AuthProviders>
      <DictionaryContext value={dictionary}>
        <LocaleContext value={locale}>{children}</LocaleContext>
      </DictionaryContext>
    </AuthProviders>
  );
};
