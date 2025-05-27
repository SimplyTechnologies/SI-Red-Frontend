export const customMutator = <T>({ url, method, data }: any): Promise<T> => {
  const token = localStorage.getItem("accessToken");
  console.log("Token from localStorage:", token); // Log the token

  return fetch(`http://localhost:3000${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }), // Log the headers
    },
    body: data ? JSON.stringify(data) : undefined,
  }).then((res) => {
    console.log("Request Headers:", {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  });
};