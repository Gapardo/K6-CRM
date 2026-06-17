import { check } from "k6";
import { login } from "../../services/authService.js";
import { detailLead } from "../../services/leadService.js";
import { safeJson } from "../../utils/helper.js";

const LEAD_IDS = [328, 327, 315];

export function setupTest() {
  const res = login("CRMTensora1@test.com", "Password123");

  return {
    token: res.json().data.access_token,
  };
}

export default function (data) {
  const token = data.token;

  const leadId = LEAD_IDS[Math.floor(Math.random() * LEAD_IDS.length)];

  const detailRes = detailLead(token, leadId);

  const success = check(detailRes, {
    "detail lead success": (r) => r && r.status === 200,
  });

  if (!success) {
    console.warn(
      `Lead Detail Failed | ID=${leadId} | Status=${detailRes.status}`,
    );
    return;
  }

  const body = safeJson(detailRes);

  check(body, {
    "detail has data": (b) => !!b?.data,
  });

  console.log(`Lead Detail ID: ${leadId}`);
}
