'use client';

import { clsx } from 'clsx';
import { use, useEffect, useId, useRef, useState } from 'react';
import { DictionaryContext, LocaleContext } from '../contexts/i18n-context';
import { useClickOutside } from '../hooks/use-click-outside';
import { Button } from './button';
import { Icon } from './icon';

type MenuUser = {
  name?: string | null;
  email?: string | null;
};

type LocaleOption = {
  value: string;
  label: string;
};

type UserMenuProps = {
  user?: MenuUser;
  localeOptions: LocaleOption[];
  isLoggingOut?: boolean;
  onLocaleChange: (locale: string) => void;
  onLogout: () => void | Promise<void>;
  className?: string;
};

const getInitials = (name?: string | null) => {
  if (!name) {
    return '';
  }

  const nameParts = name.trim().split(/\s+/);
  const first = nameParts[0]?.charAt(0) ?? '';
  const second = nameParts[1]?.charAt(0) ?? '';
  return `${first}${second}`.toUpperCase();
};

const UserMenu = ({
  user,
  localeOptions,
  isLoggingOut = false,
  onLocaleChange,
  onLogout,
  className,
}: UserMenuProps) => {
  const dictionary = use(DictionaryContext);
  const locale = use(LocaleContext);
  const userMenuOverlayRef = useRef<HTMLDivElement>(null);
  const userMenuOverlayId = useId();
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  useClickOutside(userMenuOverlayRef, () => setIsOverlayVisible(false), isOverlayVisible);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOverlayVisible(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className={clsx('pointer-events-auto relative', className)}>
      <div className={clsx('flex items-center')}>
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={isOverlayVisible}
          aria-controls={userMenuOverlayId}
          className={clsx(
            'flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white shadow-lg ring-2 ring-white transition-colors hover:bg-emerald-600 focus-visible:bg-emerald-600',
          )}
          onClick={() => setIsOverlayVisible((prevState) => !prevState)}
        >
          {getInitials(user?.name)}
        </button>
      </div>

      <div
        id={userMenuOverlayId}
        role="dialog"
        aria-modal={false}
        className={clsx(
          'absolute top-12 right-0 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white text-sm text-slate-800 shadow-xl transition-all',
          isOverlayVisible ? 'visible opacity-100' : 'invisible opacity-0',
        )}
        ref={userMenuOverlayRef}
      >
        <div className={clsx('flex flex-col items-center border-b border-slate-200 p-4')}>
          <div
            className={clsx(
              'mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xl font-semibold text-white',
            )}
          >
            {getInitials(user?.name)}
          </div>
          <div className={clsx('max-w-full truncate')}>{user?.name}</div>
          <div className={clsx('max-w-full truncate text-slate-500')}>{user?.email}</div>
        </div>

        <div className={clsx('border-b border-slate-200 px-4 py-3')}>
          <p className={clsx('mb-2 text-xs font-semibold tracking-wide text-slate-500 uppercase')}>
            {dictionary?.language}
          </p>
          <div className={clsx('flex gap-2')}>
            {localeOptions.map((localeOption) => (
              <button
                key={localeOption.value}
                type="button"
                className={clsx(
                  'rounded-full border px-3 py-1 text-xs font-semibold transition-colors',
                  localeOption.value === locale
                    ? 'border-emerald-600 bg-emerald-600 text-white'
                    : 'border-slate-300 text-slate-700 hover:border-emerald-600 hover:text-emerald-600',
                )}
                aria-pressed={localeOption.value === locale}
                onClick={() => onLocaleChange(localeOption.value)}
              >
                {localeOption.label}
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={onLogout}
          invertTextOnHover={false}
          className={clsx(
            'w-full justify-start rounded-none border-0 px-0 py-0 hover:bg-slate-50 hover:text-slate-900 focus-visible:bg-slate-50 focus-visible:text-slate-900',
          )}
          loading={isLoggingOut}
          disabled={isLoggingOut}
        >
          <span className={clsx('flex w-full items-center gap-4 py-2')}>
            <Icon
              name="chevron"
              className={clsx('h-4 w-4 -rotate-90 transition-transform group-hover:translate-x-1')}
            />
            {dictionary?.logout}
          </span>
        </Button>
      </div>
    </div>
  );
};

export { UserMenu };
