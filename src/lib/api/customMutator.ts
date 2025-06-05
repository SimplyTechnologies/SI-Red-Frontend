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

  if (!res.ok) {
    let errorBody;
    try {
      errorBody = await res.json();
    } catch {
      errorBody = { message: res.statusText };
    }

    if (res.status === 401) {
      const error: any = new Error("Incorrect email or password");
      error.status = 401;
      errorBody = error.data;

      throw error;
    }

    const error: any = new Error(errorBody?.message || "Something went wrong");
    error.status = res.status;
    error.data = errorBody;

    throw error;
  }

  return res.json();
};
