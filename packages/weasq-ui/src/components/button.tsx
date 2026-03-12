'use client';

import { clsx } from 'clsx';
import type { MouseEvent, ReactNode } from 'react';
import { Loader } from './loader/loader';

type ButtonProps = {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  loading?: boolean;
  disabled?: boolean;
  danger?: boolean;
  invertTextOnHover?: boolean;
};

const Button = ({
  onClick,
  children,
  className,
  ariaLabel,
  loading,
  disabled,
  danger,
  invertTextOnHover = true,
}: ButtonProps) => {
  const interactiveClasses = danger
    ? invertTextOnHover
      ? clsx(
          'border-red-500 hover:border-red-500 hover:bg-red-500 hover:text-white focus-visible:border-red-500 focus-visible:bg-red-500 focus-visible:text-white',
        )
      : clsx(
          'border-red-500 text-red-600 hover:border-red-500 hover:bg-red-100 hover:text-red-700 focus-visible:border-red-500 focus-visible:bg-red-100 focus-visible:text-red-700',
        )
    : invertTextOnHover
      ? clsx(
          'border-gray-300 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white focus-visible:border-emerald-600 focus-visible:bg-emerald-600 focus-visible:text-white',
        )
      : clsx(
          'border-emerald-600 text-emerald-700 hover:border-emerald-600 hover:bg-emerald-100 hover:text-emerald-800 focus-visible:border-emerald-600 focus-visible:bg-emerald-100 focus-visible:text-emerald-800',
        );

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'group relative flex items-center justify-center rounded-3xl border bg-white px-4 py-2 text-sm text-slate-900 transition-colors',
        'disabled:pointer-events-none disabled:text-gray-300',
        interactiveClasses,
        className,
      )}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
    >
      <span
        aria-hidden
        className={clsx(
          'absolute left-1/2 inline-block h-4 w-4 -translate-x-1/2 transition-opacity',
          loading ? 'opacity-100' : 'opacity-0',
        )}
      >
        <Loader />
      </span>
      <span aria-hidden={loading} className={clsx('w-full transition-opacity', loading ? 'opacity-0' : 'opacity-100')}>
        {children}
      </span>
    </button>
  );
};

export { Button };
