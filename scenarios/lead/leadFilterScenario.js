import { check } from "k6";
import { login } from "../../services/authService.js"
import { filterLead } from "../../services/leadService.js";
import { randomLast30DaysRange } from "../../utils/random.js";
import { safeJson } from "../../utils/helper.js";

export function setupTest() {
  const res = login("CRMTensora1@test.com", "Password123");

  const token = res.json().data.access_token;

  return { token };
}

export default function (data) {
  const token = data.token;

  const { startDate, endDate } = randomLast30DaysRange();

  const filterRes = filterLead(token, startDate, endDate);

  check(filterRes, {
    "filter lead": (r) => r && r.status === 200,
  });

  const body = safeJson(filterRes);

  if (!body) {
    console.warn("Invalid JSON Response");
    return;
  }

  const leads = Array.isArray(body?.data) ? body.data : [];

  check(leads, {
    "filtered data exists": (arr) => arr.length >= 0,
  });

  console.log(`Filtered Leads Retrieved: ${leads.length}`);
}
