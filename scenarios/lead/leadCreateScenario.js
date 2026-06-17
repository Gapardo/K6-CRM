import { check } from "k6";

import { login } from "../../services/authService.js";
import { createLead } from "../../services/leadService.js";
import { buildLeadPayload } from "../../payloads/leadPayload.js";
import { safeJson } from "../../utils/helper.js";

export function setupTest() {
  const loginRes = login("CRMTensora1@test.com", "Password123");

  console.log("STATUS:", loginRes.status);
  console.log("BODY:", loginRes.body);

  const body = safeJson(loginRes);

  console.log("PARSED:", JSON.stringify(body));

  const token =
    body?.token ||
    body?.access_token ||
    body?.data?.token ||
    body?.data?.access_token;

  return { token };
}

export default function (data) {
  const payload = buildLeadPayload();

  console.log("TOKEN:", data.token);
  console.log("PAYLOAD:", JSON.stringify(payload));

  const res = createLead(data.token, payload);
  console.log("CREATE RESPONSE:", res.body);
  check(res, {
    "create lead success": (r) => r.status === 200 || r.status === 201,
  });

  if (res.status !== 200 && res.status !== 201) {
    console.error(`Create Lead Failed: ${res.status}`);
    console.error(res.body);
  }
}
