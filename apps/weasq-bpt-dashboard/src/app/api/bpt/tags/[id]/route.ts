import { buildBptApiUrl } from '@/lib/bpt-api';
import { createKeycloakAuthOptions } from '@weasq/weasq-auth/server';
import { fetchWithToken } from '@weasq/weasq-auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

type RouteContext = {
  params: Promise<{ id: string }>;
};

const createAuthErrorResponse = () => {
  return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
};

const createProxyResponse = async (response: Response) => {
  if (response.status === 204) {
    return new NextResponse(null, { status: 204 });
  }

  const responseBodyText = await response.text();
  const contentType = response.headers.get('content-type') ?? 'application/json';

  return new NextResponse(responseBodyText, {
    status: response.status,
    headers: {
      'content-type': contentType,
    },
  });
};

export const GET = async (_request: Request, context: RouteContext) => {
  const session = await getServerSession(createKeycloakAuthOptions());

  if (!session?.accessToken) {
    return createAuthErrorResponse();
  }

  const { id } = await context.params;
  const response = await fetchWithToken(buildBptApiUrl(`/tags/${id}`), session.accessToken);
  return createProxyResponse(response);
};

export const PUT = async (request: Request, context: RouteContext) => {
  const session = await getServerSession(createKeycloakAuthOptions());

  if (!session?.accessToken) {
    return createAuthErrorResponse();
  }

  const { id } = await context.params;
  const body = (await request.json()) as { name?: string };
  const response = await fetchWithToken(buildBptApiUrl(`/tags/${id}`), session.accessToken, 'PUT', body);
  return createProxyResponse(response);
};

export const DELETE = async (_request: Request, context: RouteContext) => {
  const session = await getServerSession(createKeycloakAuthOptions());

  if (!session?.accessToken) {
    return createAuthErrorResponse();
  }

  const { id } = await context.params;
  const response = await fetchWithToken(buildBptApiUrl(`/tags/${id}`), session.accessToken, 'DELETE');
  return createProxyResponse(response);
};
