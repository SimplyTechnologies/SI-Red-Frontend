export const customMutator = <T>({ url, method, params, data }: any): Promise<T> => {
  // Build query string for GET requests
  const queryString = params
    ? '?' +
      Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
        .join('&')
    : '';

  return fetch(`http://localhost:3000${url}${queryString}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: method !== 'GET' && data ? JSON.stringify(data) : undefined, // Only include body for non-GET requests
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  });
};