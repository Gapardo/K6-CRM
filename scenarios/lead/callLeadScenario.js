import { check } from "k6";
import { login } from "../../services/authService.js";
import { getLeads, callLead } from "../../services/leadService.js";
import { safeJson } from "../../utils/helper.js";

export function setupTest() {
  const res = login("CRMTensora1@test.com", "Password123");
  const body = safeJson(res);

  return {
    token: body?.data?.access_token,
  };
}

export default function (data) {
  const token = data.token;

  // 1. GET LEADS
  const res = getLeads(token);
  const body = safeJson(res);

  console.log("GET LEADS RESPONSE:", JSON.stringify(body, null, 2));

  // 2. HANDLE MULTIPLE STRUCTURE API
  const leads = body?.data?.data ?? body?.data ?? body?.results ?? [];

  // 3. FILTER VALID LEADS (ANTI EMPTY / INVALID STATUS)
  const validLeads = Array.isArray(leads) ? leads.filter((l) => l?.id) : [];

  if (!validLeads.length) {
    console.error("❌ No leads found for CALL");
    return;
  }

  // 4. PICK RANDOM LEAD
  const lead = validLeads[Math.floor(Math.random() * validLeads.length)];
  const leadId = lead.id;

  console.log(`📌 SELECTED LEAD ID: ${leadId}`);

  // 5. PAYLOAD CALL
  const payload = {
    title: "QA Call",
    context: "k6 performance test",
    status: "completed",
    call_time: new Date().toISOString(),
    duration: 5,
    handled_by_id: 1,
    related_to_id: leadId,
    related_to_type: "Lead",
    opportunity_ids: [],
    account_ids: [5],
  };

  // 6. EXECUTE CALL API
  const callRes = callLead(token, leadId, payload);
  const callBody = safeJson(callRes);

  const ok = check(callRes, {
    "call lead success": (r) => r.status === 200 || r.status === 201,
  });

  if (!ok) {
    console.error("❌ CALL FAILED:", JSON.stringify(callBody, null, 2));
  } else {
    console.log(`✅ CALL SUCCESS leadId=${leadId}`);
  }
}
