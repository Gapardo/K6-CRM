// services/leadService.js
import http from "k6/http";
import { CONFIG } from "../config/index.js";

function authHeaders(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    timeout: "60s",
  };
}

export function getLeads(token) {
  return http.get(
    `${CONFIG.ENV.BASE_URL}/api/leads?page=1&limit=10`,
    authHeaders(token),
  );
}

export function searchLead(token, keyword) {
  return http.get(
    `${CONFIG.ENV.BASE_URL}/api/leads?page=1&limit=10&search=${keyword}`,
    authHeaders(token),
  );
}

export function filterLead(
  token,
  startDate,
  endDate,
  ownerIds = "",
  accountIds = "",
  leadSourceId = "",
) {
  const url =
    `${CONFIG.ENV.BASE_URL}/api/leads?page=1&limit=10` +
    `&start_date=${startDate}` +
    `&end_date=${endDate}` +
    `&sort=desc` +
    `&sortBy=name` +
    `&owner_id=${ownerIds}` +
    `&account_id=${accountIds}` +
    `&lead_source_id=${leadSourceId}`;
  return http.get(url, authHeaders(token));
}

export function detailLead(token, id) {
  return http.get(`${CONFIG.ENV.BASE_URL}/api/leads/${id}`, authHeaders(token));
}

export function generateLeadData() {
  const unique = `${Date.now()}${Math.floor(Math.random() * 10000)}`;
  return {
    firstName: `Perf${unique}`,
    lastName: "Testing",
    email: `perf${unique}@mail.com`,
    phone: `+628${unique.slice(-10)}`,
    whatsapp: `+628${unique.slice(-10)}`,
  };
}

export function createLead(token, payload) {
  const boundary = `----K6Boundary${Date.now()}`;

  let body = "";

  for (const [key, value] of Object.entries(payload)) {
    body += `--${boundary}\r\n`;
    body += `Content-Disposition: form-data; name="${key}"\r\n\r\n`;
    body += `${value}\r\n`;
  }

  body += `--${boundary}--\r\n`;

  return http.post(`${CONFIG.ENV.BASE_URL}/api/leads`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": `multipart/form-data; boundary=${boundary}`,
    },
    timeout: "60s",
  });
}
export function deleteLead(token, leadId) {
  return http.del(`${CONFIG.ENV.BASE_URL}/api/leads/${leadId}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    timeout: "60s",
  });
}
export function updateLead(token, leadId, payload) {
  const boundary = `----K6Boundary${Date.now()}`;

  let body = "";

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      body += `--${boundary}\r\n`;
      body += `Content-Disposition: form-data; name="${key}"\r\n\r\n`;
      body += `${value}\r\n`;
    }
  });

  body += `--${boundary}--\r\n`;

  return http.put(`${CONFIG.ENV.BASE_URL}/api/leads/${leadId}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": `multipart/form-data; boundary=${boundary}`,
    },
    timeout: "60s",
  });
}

export function sendLeadEmail(token, leadId, payload) {
  const boundary = `----K6Boundary${Date.now()}`;

  let body = "";

  for (const [key, value] of Object.entries(payload)) {
    body += `--${boundary}\r\n`;
    body += `Content-Disposition: form-data; name="${key}"\r\n\r\n`;
    body += `${Array.isArray(value) ? JSON.stringify(value) : value}\r\n`;
  }

  body += `--${boundary}--\r\n`;

  return http.post(`${CONFIG.ENV.BASE_URL}/api/leads/${leadId}/email`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": `multipart/form-data; boundary=${boundary}`,
    },
    timeout: "60s",
  });
}
