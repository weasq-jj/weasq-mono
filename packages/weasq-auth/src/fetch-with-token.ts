export type FetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const fetchWithToken = async (
  url: string,
  token?: string,
  method: FetchMethod = 'GET',
  body?: object,
  formData?: FormData,
) => {
  if (!token) {
    throw new Error('No token available');
  }

  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
  };

  let requestBody: BodyInit | undefined;

  if (formData) {
    requestBody = formData;
  } else if (body) {
    headers['Content-Type'] = 'application/json';
    requestBody = JSON.stringify(body);
  }

  return fetch(url, {
    method,
    headers,
    body: requestBody,
  });
};
