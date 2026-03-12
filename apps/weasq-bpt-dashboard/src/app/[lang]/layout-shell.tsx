'use client';

import { locales, type Locale } from '@/types/globals';
import { federatedLogout } from '@weasq/weasq-auth/client';
import { UserMenu } from '@weasq/weasq-ui';
import { clsx } from 'clsx';
import { type Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { useState } from 'react';

type LayoutShellProps = {
  children: ReactNode;
  locale: Locale;
};

const buildLocalePath = (pathname: string, currentLocale: Locale, nextLocale: string) => {
  const segments = pathname.split('/').filter(Boolean);

  if (segments[0] === currentLocale) {
    return `/${[nextLocale, ...segments.slice(1)].join('/')}`;
  }

  return `/${[nextLocale, ...segments].join('/')}`;
};

const LayoutShell = ({ children, locale }: LayoutShellProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { data: sessionData } = useSession() as { data: Session | null };

  const handleLocaleChange = (nextLocale: string) => {
    if (nextLocale === locale) {
      return;
    }

    router.push(buildLocalePath(pathname, locale, nextLocale));
  };

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    try {
      await federatedLogout();
    } catch {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className={clsx('relative min-h-screen')}>
      <header className={clsx('fixed top-5 right-5 z-50')}>
        <UserMenu
          user={sessionData?.user}
          localeOptions={locales.map((localeOption) => ({ value: localeOption, label: localeOption.toUpperCase() }))}
          isLoggingOut={isLoggingOut}
          onLocaleChange={handleLocaleChange}
          onLogout={handleLogout}
        />
      </header>

      {children}
    </div>
  );
};

export default LayoutShell;
