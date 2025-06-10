const API_BASE_URL_LOCAL = 'http://10.20.20.89:8080/api';
const API_BASE_URL = 'https://compdivers.mrtndev.org/api';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface FetchOptions<T> {
  method?: RequestMethod;
  body?: T;
  token?: string;
}

export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions<any> = {}
): Promise<T> {
  const { method = 'GET', body, token } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL_LOCAL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${response.status}`);
  }

  const jsonData = await response.json()
  return jsonData;
}