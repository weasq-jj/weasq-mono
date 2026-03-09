'use client';

import { clsx } from 'clsx';
import { type ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
}

export const Button = ({ children, className, appName }: ButtonProps) => {
  return (
    <button className={clsx(className)} onClick={() => alert(`Hello from your ${appName} app!`)}>
      {children}
    </button>
  );
};
