import { check } from "k6";
import { login } from "../../services/authService.js";
import { getLeads, sendLeadEmail } from "../../services/leadService.js";
import { buildEmailPayload } from "../../payloads/leadEmailPayload.js";
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

  if (!token) {
    console.error("Token not found");
    return;
  }

  const listRes = getLeads(token);

  check(listRes, {
    "get leads success": (r) => r.status === 200,
  });

  const listBody = safeJson(listRes);

  console.log(`GET LEADS STATUS = ${listRes.status}`);

  const leads = listBody?.data?.data || listBody?.data || [];

  if (!Array.isArray(leads) || leads.length === 0) {
    console.error(`No leads found | Response: ${JSON.stringify(listBody)}`);
    return;
  }

  const lead = leads[Math.floor(Math.random() * leads.length)];

  const leadId = lead.id;

  console.log(`INFO: SELECTED LEAD ID = ${leadId}`);

  const payload = buildEmailPayload({
    subject: `K6 Subject ${Date.now()}`,
  });

  const emailRes = sendLeadEmail(token, leadId, payload);

  const emailOk = check(emailRes, {
    "send email success": (r) => r.status === 200 || r.status === 201,
  });

  if (!emailOk) {
    console.error(
      `EMAIL FAILED | Status=${emailRes.status} | Body=${emailRes.body}`,
    );
    return;
  }

  console.log(`EMAIL SENT SUCCESS | LeadId=${leadId}`);
}
