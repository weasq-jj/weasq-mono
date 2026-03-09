import { clsx } from 'clsx';
import { type JSX, type ReactNode } from 'react';

export const Code = ({ children, className }: { children: ReactNode; className?: string }): JSX.Element => {
  return <code className={clsx(className)}>{children}</code>;
};
