export const customMutator = <T>({ url, method, data }: any): Promise<T> => {
  const token = localStorage.getItem("accessToken");

  return fetch(`http://localhost:3000${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }), 
    },
    body: data ? JSON.stringify(data) : undefined,
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  });
};