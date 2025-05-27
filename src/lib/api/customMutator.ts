export const customMutator = <T>({ url, method, data }: any): Promise<T> => {
  const baseUrl = import.meta.env.VITE_API_URL;

  return fetch(`${baseUrl}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  }).then((res) => res.json());
};
