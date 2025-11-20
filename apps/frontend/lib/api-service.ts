import "server-only";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
  next?: NextFetchRequestConfig;
  cache?: RequestCache;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const API_BASE_URL = process.env.API_URL || "";

async function coreFetch<T>(
  endpoint: string,
  method: HttpMethod,
  body: unknown = null,
  options: FetchOptions = {}
): Promise<T> {
  const session = await auth();
  const token = session?.accessToken;

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let requestBody: BodyInit | null | undefined;

  if (body) {
    if (body instanceof FormData) {
      requestBody = body;
    } else {
      headers["Content-Type"] = "application/json";
      requestBody = JSON.stringify(body);
    }
  }

  const url = `${API_BASE_URL.replace(/\/$/, "")}/${endpoint.replace(
    /^\//,
    ""
  )}`;

  const response = await fetch(url, {
    method,
    headers,
    body: requestBody,
    ...options,
  });

  if (response.status === 401) {
    redirect("/login");
  }

  if (!response.ok) {
    const errorData = (await response.json().catch(() => null)) as unknown;
    throw new ApiError(response.status, response.statusText, errorData);
  }

  if (response.status === 204) return null as T;

  return response.json();
}

export const apiService = {
  get: <T>(endpoint: string, options?: FetchOptions) =>
    coreFetch<T>(endpoint, "GET", null, options),

  post: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
    coreFetch<T>(endpoint, "POST", body, options),

  put: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
    coreFetch<T>(endpoint, "PUT", body, options),

  patch: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
    coreFetch<T>(endpoint, "PATCH", body, options),

  del: <T>(endpoint: string, options?: FetchOptions) =>
    coreFetch<T>(endpoint, "DELETE", null, options),
};
