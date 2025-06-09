import { BASE_URL } from "@/config/apiConfig";
import { useAuthStore } from "@/store/authStore";

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token");

  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    throw new Error("Failed to refresh token");
  }

  const data = await res.json();
  const newAccessToken = data.newAccessToken;

  localStorage.setItem("accessToken", newAccessToken);
  useAuthStore
    .getState()
    .setTokens(
      newAccessToken,
      refreshToken,
      useAuthStore.getState().role || ""
    );

  return newAccessToken;
};

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
  const makeRequest = async (accessToken?: string): Promise<Response> => {
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
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      body: data ? JSON.stringify(data) : undefined,
      signal,
    });
  };

  let accessToken = localStorage.getItem("accessToken");
  let res = await makeRequest(accessToken!);

  if (res.status === 401) {
    try {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshAccessToken();
      } else {
        console.log("Waiting for token refresh...");
      }

      const newAccessToken = await refreshPromise;
      isRefreshing = false;
      refreshPromise = null;

      res = await makeRequest(newAccessToken!);
    } catch (err) {
      isRefreshing = false;
      refreshPromise = null;
      useAuthStore.getState().logout();
      throw new Error("Session expired. Please sign in again.");
    }
  }

  if (!res.ok) {
    let errorBody;
    try {
      errorBody = await res.json();
    } catch {
      errorBody = { message: res.statusText };
    }

    const error: any = new Error(errorBody?.message || "Something went wrong");
    error.status = res.status;
    error.data = errorBody;

    throw error;
  }

  return res.json();
};
