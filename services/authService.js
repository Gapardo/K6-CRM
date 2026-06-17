// services/authService.js
import http from "k6/http";
import { CONFIG } from "../config/index.js";

export function login(email, password) {
  const url = `${CONFIG.ENV.BASE_URL}/api/auth/login`; // pastikan endpoint benar
  const payload = JSON.stringify({ email, password });
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return http.post(url, payload, params);
}
