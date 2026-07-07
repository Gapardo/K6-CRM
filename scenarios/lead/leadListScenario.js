import { check, sleep } from "k6";
import { login } from "../../services/authService.js";
import { getLeads } from "../../services/leadService.js";
import { safeJson } from "../../utils/helper.js";

export function setupTest() {
  const res = login("CRMTensora1@test.com", "Password123");

  return {
    token: res.json().data.access_token,
  };
}

export default function (data) {
  const token = data.token;

  const listRes = getLeads(token);

  const success = check(listRes, {
    "get leads": (r) => r?.status === 200,
    "response time < 2 sec": (r) => r?.timings?.duration < 2000,
  });

  if (!success) {
    console.warn(`Get Leads Failed | Status=${listRes?.status}`);
    return;
  }

  if (!body) {
    console.warn("Invalid JSON Response");
    return;
  }

  const leads = Array.isArray(body?.data) ? body.data : [];

  check(body, {
    "success true": (b) => b.success === true,
  });

  check(leads, {
    "lead data exists": (arr) => arr.length > 0,
  });

  console.log(`Total Leads Retrieved: ${leads.length}`);
}
