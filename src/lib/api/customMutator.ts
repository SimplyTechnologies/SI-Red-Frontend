import { BASE_URL } from "@/config/apiConfig";

export const customMutator = <T>({
  url,
  method,
  data,
  params,
  signal,
}: {
  url: string;
  method: string;
  data?: any;
  params?: Record<string, any>;
  signal?: AbortSignal;
}): Promise<T> => {
  const token = localStorage.getItem("accessToken");
  const queryString = params
    ? "?" +
      new URLSearchParams(
        Object.entries(params).reduce((acc, [key, val]) => {
          acc[key] = String(val);
          return acc;
        }, {} as Record<string, string>)
      ).toString()
    : "";

  return fetch(`${BASE_URL}${url}${queryString}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: data ? JSON.stringify(data) : undefined,
    signal,
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  });
};
