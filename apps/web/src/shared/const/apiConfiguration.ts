export const API_BASE_URL =
  import.meta.env.VITE_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const API_AUTH_BASE_URL = `${API_BASE_URL}/auth`;
export const API_PROFILES_BASE_URL = `${API_BASE_URL}/profiles`;
export const API_WALLETS_BASE_URL = `${API_BASE_URL}/wallet`;
