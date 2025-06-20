import { BASE_URL } from "@/config/apiConfig";
import { useAuthStore } from "@/store/authStore";

type ResponseType = "json" | "blob" | "stream";

interface MutatorConfig<T = any> {
  url: string;
  method: string;
  data?: T;
  params?: Record<string, any>;
  signal?: AbortSignal;
  responseType?: ResponseType;
  headers?: Record<string, string>;
}

interface ErrorResponse {
  message: string;
  status?: number;
  data?: any;
}

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
  responseType = "json",
  headers = {},
}: MutatorConfig): Promise<T> => {
  const makeRequest = async (accessToken?: string): Promise<Response> => {
    const queryString = params
      ? "?" +
        (() => {
          const usp = new URLSearchParams();

          Object.entries(params).forEach(([key, val]) => {
            if (Array.isArray(val)) {
              val.forEach((v) => usp.append(key, String(v)));
            } else if (val !== undefined && val !== null) {
              usp.append(key, String(val));
            }
          });

          return usp.toString();
        })()
      : "";

    const defaultHeaders: Record<string, string> = {
      ...(method !== "GET" && { "Content-Type": "application/json" }),
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...headers,
    };
    let body: BodyInit | null = null;

    if (data instanceof FormData) {
      body = data;
      delete defaultHeaders["Content-Type"]; 
    } else if (data) {
      body = JSON.stringify(data);
    }

    return fetch(`${BASE_URL}${url}${queryString}`, {
      method,
      headers: defaultHeaders,
      body,
      signal,
    });
  };

  const accessToken = localStorage.getItem("accessToken");
  let res = await makeRequest(accessToken || undefined);

  if (res.status === 401) {
    let errorBody;
    try {
      errorBody = await res.json();
    } catch {
      errorBody = { message: res.statusText };
    }
    if (errorBody.message === "Force logout required") {
      useAuthStore.getState().logout();
      window.location.href = "/signin";
      throw new Error("You have been forcefully logged out");
    }

    try {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshAccessToken();
      }

      const newAccessToken = await refreshPromise;
      isRefreshing = false;
      refreshPromise = null;

      if (!newAccessToken) {
        throw new Error("Failed to refresh token");
      }

      res = await makeRequest(newAccessToken);
    } catch (err) {
      isRefreshing = false;
      refreshPromise = null;
      useAuthStore.getState().logout();
      throw new Error("Session expired. Please sign in again.");
    }
  }

  if (!res.ok) {
    let errorBody: ErrorResponse;
    try {
      errorBody = await res.json();
    } catch {
      errorBody = { message: res.statusText };
    }
    const error = new Error(
      errorBody.message || "Something went wrong"
    ) as Error & ErrorResponse;
    error.status = res.status;
    error.data = errorBody;
    throw error;
  }

  // Handle different response types appropriately
  switch (responseType) {
    case "blob":
      return (await res.blob()) as T;
    case "stream":
      const blob = await res.blob();
      return new Blob([blob], { type: "text/csv" }) as unknown as T;
    case "json":
    default:
      return await res.json();
  }
};
