'use client';

import { clsx } from 'clsx';
import { signIn } from 'next-auth/react';
import { useEffect, useRef } from 'react';

type LoginProps = {
  provider?: string;
  bodyClassName?: string;
  className?: string;
};

export const Login = ({ provider = 'keycloak', bodyClassName = 'bg-primary-green-500', className }: LoginProps) => {
  const hasTriggeredSignInRef = useRef(false);

  useEffect(() => {
    if (!hasTriggeredSignInRef.current) {
      hasTriggeredSignInRef.current = true;
      void signIn(provider);
    }

    document.body.classList.add(bodyClassName);

    return () => {
      document.body.classList.remove(bodyClassName);
    };
  }, [provider, bodyClassName]);

  return (
    <div className={clsx('flex min-h-screen animate-pulse items-center justify-center', className)}>
      <svg className={clsx('h-32 w-32')} viewBox="164.025 141.712 33.733 40.653" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 195.587 157.529 C 195.587 148.812 188.528 141.712 179.806 141.712 C 171.083 141.712 164.025 148.809 164.025 157.529 C 164.025 166.249 171.083 173.258 179.806 173.258 C 188.528 173.258 195.587 166.204 195.587 157.529 Z M 169.722 157.529 C 169.722 151.705 174.106 146.969 179.806 146.969 C 185.506 146.969 189.89 151.702 189.89 157.529 C 189.89 163.357 185.506 167.997 179.806 167.997 C 174.106 167.997 169.722 163.311 169.722 157.529 Z"
          fill="white"
        />
        <path
          d="M 195.165 177.108 C 184.513 177.108 181.839 175.091 179.735 175.091 C 178.508 175.091 177.149 176.055 177.149 177.678 C 177.149 178.774 177.763 179.823 178.948 180.174 C 184.91 181.84 188.723 182.365 194.775 182.365 C 196.307 182.365 197.758 181.447 197.758 179.649 C 197.758 178.377 196.75 177.108 195.168 177.108 L 195.165 177.108 Z"
          fill="white"
        />
      </svg>
    </div>
  );
};
