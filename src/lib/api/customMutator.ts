import { BASE_URL } from "@/config/apiConfig";

export const customMutator = async <T>({
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

  const res = await fetch(`${BASE_URL}${url}${queryString}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: data ? JSON.stringify(data) : undefined,
    signal,
  });

  if (res.status === 401) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/signin";
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return res.json();
};
