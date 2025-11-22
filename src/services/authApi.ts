export const BACKEND_BASE_URL =
  (import.meta.env.VITE_BACKEND_URL as string | undefined) || "http://localhost:4000";

const API_BASE = BACKEND_BASE_URL.replace(/\/$/, "");
const SESSION_STORAGE_KEY = "eriniaSessionToken";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, options);
  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    const message = payload?.message || "Falha ao comunicar com o servidor.";
    throw new Error(message);
  }

  return payload as T;
}

export interface RegistrationPayload {
  fullName: string;
  email: string;
  whatsapp?: string;
  username: string;
  password: string;
}

export interface RegistrationResponse {
  success: boolean;
  message: string;
  playerName: string;
  officialLogin: string;
  officialPassword: string;
  user: {
    id: string;
    name: string;
    email: string;
    username: string;
    createdAt: string;
  };
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  expiresIn: number;
}

export interface ProfileResponse {
  success: boolean;
  profile: {
    id: string;
    name: string;
    email: string;
    username: string;
    createdAt: string;
    officialCredentials: {
      login: string;
      createdAt: string;
    } | null;
    profile: {
      avatarUrl: string;
      theme: "light" | "dark";
    };
  };
}

export interface RevealPasswordResponse {
  success: boolean;
  password: string;
}

export async function revealOfficialPassword(token: string) {
  return request<RevealPasswordResponse>("/api/profile/reveal-password", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

export async function logoutUser(token: string) {
  return request<{ success: boolean; message: string }>("/api/logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

export async function registerUser(payload: RegistrationPayload) {
  return request<RegistrationResponse>("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function loginUser(payload: LoginPayload) {
  return request<LoginResponse>("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function fetchProfile(token: string) {
  return request<ProfileResponse>("/api/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function saveSessionToken(token: string) {
  localStorage.setItem(SESSION_STORAGE_KEY, token);
}

export function readSessionToken() {
  return localStorage.getItem(SESSION_STORAGE_KEY);
}

export function clearSessionToken() {
  localStorage.removeItem(SESSION_STORAGE_KEY);
}
