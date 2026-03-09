'use client';

import { SessionProvider } from 'next-auth/react';
import { type ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return <SessionProvider refetchInterval={4 * 60}>{children}</SessionProvider>;
};
