const DEFAULT_BPT_API_BASE_URL = 'https://api.weasq.io/bpt';

const getSanitizedBaseUrl = () => {
  return DEFAULT_BPT_API_BASE_URL.endsWith('/') ? DEFAULT_BPT_API_BASE_URL.slice(0, -1) : DEFAULT_BPT_API_BASE_URL;
};

export const buildBptApiUrl = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getSanitizedBaseUrl()}${normalizedPath}`;
};
