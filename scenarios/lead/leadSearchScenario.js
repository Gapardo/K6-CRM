import { check, sleep } from "k6";

import { login } from "../../services/authService.js";
import { searchLead } from "../../services/leadService.js";

import { randomFromArray } from "../../utils/random.js";
import { safeJson } from "../../utils/helper.js";

const keywords = ["test", "john", "sales", "crm", "lead", "vip"];

export function setupTest() {
  const res = login("CRMTensora1@test.com", "Password123");

  return {
    token: res.json().data.access_token,
  };
}

export default function (data) {
  const keyword = randomFromArray(keywords);

  const searchRes = searchLead(data.token, keyword);

  check(searchRes, {
    "search leads": (r) => r && r.status === 200,
  });

  const body = safeJson(searchRes);

  if (!body) {
    console.warn("Invalid JSON Response");
    sleep(1);
    return;
  }

  const leads = Array.isArray(body?.data) ? body.data : [];

  check(body, {
    "search success": (b) => b.success === true,
  });

  console.log(`[SEARCH] keyword="${keyword}" | results=${leads.length}`);
}
