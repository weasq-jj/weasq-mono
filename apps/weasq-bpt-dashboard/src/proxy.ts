import { defaultLocale, locales } from '@/types/globals';
import { type NextRequest } from 'next/server';

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (pathnameHasLocale) {
    return;
  }

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return Response.redirect(request.nextUrl, 301);
};

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next).*)'],
};
