'use client';

import { signOut } from 'next-auth/react';

interface FederatedLogoutOptions {
  endpoint?: string;
  fallbackUrl?: string;
}

export const federatedLogout = async ({
  endpoint = '/api/auth/federated-logout',
  fallbackUrl = '/',
}: FederatedLogoutOptions = {}) => {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    if (response.ok && data.url) {
      await signOut({ redirect: false });
      window.location.href = data.url;
      return;
    }

    throw new Error(data.error ?? 'Unable to logout from session');
  } catch (error) {
    console.error(error);
    await signOut({ redirect: false });
    window.location.href = fallbackUrl;
  }
};
