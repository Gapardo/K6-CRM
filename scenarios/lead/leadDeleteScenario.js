import { check } from "k6";

import { login } from "../../services/authService.js";
import { getLeads, deleteLead } from "../../services/leadService.js";
import { safeJson } from "../../utils/helper.js";

export function setupTest() {
  const loginRes = login("CRMTensora1@test.com", "Password123");

  const body = safeJson(loginRes);

  return {
    token: body.data.access_token,
  };
}

export default function (data) {
  const token = data.token;

  const listRes = getLeads(token);

  const listBody = safeJson(listRes);

  if (
    !listBody ||
    !Array.isArray(listBody.data) ||
    listBody.data.length === 0
  ) {
    console.error("No lead found");
    return;
  }

  const leadId = listBody.data[0].id;

  console.log(`DELETE LEAD ID: ${leadId}`);

  const deleteRes = deleteLead(token, leadId);

  check(deleteRes, {
    "delete lead success": (r) => r.status === 200 || r.status === 204,
  });

  if (deleteRes.status !== 200 && deleteRes.status !== 204) {
    console.error(`Delete Failed: ${deleteRes.status}`);

    console.error(deleteRes.body);
  }
}
