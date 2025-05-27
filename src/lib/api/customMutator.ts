export const customMutator = <T>({ url, method, data }: any): Promise<T> => {
  return fetch(`http://localhost:3000${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  }).then((res) => res.json());
};
