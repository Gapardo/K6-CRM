import { check } from "k6";
import { login } from "../../services/authService.js";
import { getLeads, convertLead } from "../../services/leadService.js";
import { safeJson } from "../../utils/helper.js";

export function setupTest() {
  const loginRes = login("CRMTensora1@test.com", "Password123");

  const body = safeJson(loginRes);

  return {
    token: body?.data?.access_token,
  };
}

export default function (data) {
  const token = data.token;

  // GET LEAD LIST
  const listRes = getLeads(token);

  check(listRes, {
    "get lead list success": (r) => r.status === 200,
  });

  const listBody = safeJson(listRes);

  // sesuaikan dengan struktur API lu
  const leads = listBody?.data?.data || listBody?.data || [];

  if (!Array.isArray(leads) || leads.length === 0) {
    console.error("No leads found");
    return;
  }

  // RANDOM LEAD
  const lead = leads[Math.floor(Math.random() * leads.length)];

  const leadId = lead.id;

  console.log(`CONVERT LEAD ID = ${leadId}`);

  // CONVERT
  const res = convertLead(token, leadId);

  const ok = check(res, {
    "convert lead success": (r) => r.status === 200 || r.status === 201,
  });

  if (!ok) {
    console.error(`CONVERT FAILED: ${res.body}`);
    return;
  }

  console.log(`CONVERT SUCCESS: ${leadId}`);
}
