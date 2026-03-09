'use client';

import { signIn, useSession } from 'next-auth/react';
import { type ReactNode, useEffect } from 'react';

export type SessionGuardProps = {
  children: ReactNode;
  provider?: string;
};

export const SessionGuard = ({ children, provider = 'keycloak' }: SessionGuardProps) => {
  const { data } = useSession();

  useEffect(() => {
    if (data?.error === 'RefreshAccessTokenError') {
      void signIn(provider);
    }
  }, [data, provider]);

  return <>{children}</>;
};
