import { check } from "k6";
import { login } from "../../services/authService.js";
import { getLeads, updateLead } from "../../services/leadService.js";
import { buildEditLeadPayload } from "../../payloads/editLeadPayload.js";
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

  // GET LEADS
  const listRes = getLeads(token);

  check(listRes, {
    "get lead list success": (r) => r.status === 200,
  });

  const listBody = safeJson(listRes);
  const leads = listBody?.data || [];

  if (!Array.isArray(leads) || leads.length === 0) {
    console.error("No leads found");
    return;
  }

  const leadId = leads[Math.floor(Math.random() * leads.length)].id;
  // BUILD PAYLOAD (SAFE)
  const payload = buildEditLeadPayload({
    first_name: `EDIT_${Date.now()}`,
  });

  // UPDATE
  const res = updateLead(token, leadId, payload);

  check(res, {
    "edit lead success": (r) => r.status === 200 || r.status === 201,
  });

  if (res.status !== 200 && res.status !== 201) {
    console.error("Edit failed:", res.body);
  }
}
