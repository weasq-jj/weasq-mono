import { createKeycloakAuthOptions } from '@weasq/weasq-auth/server';
import NextAuth from 'next-auth';

const handler = NextAuth(createKeycloakAuthOptions());

export { handler as GET, handler as POST };
