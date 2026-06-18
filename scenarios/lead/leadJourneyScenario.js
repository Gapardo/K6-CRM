import { check, sleep } from "k6";
import { login } from "../../services/authService.js";

import {
  getLeads,
  searchLead,
  detailLead,
  filterLead,
} from "../../services/leadService.js";

import {
  randomFromArray,
  randomNumber,
  randomLast30DaysRange,
  randomDateRange,
} from "../../utils/random.js";

import { safeJson } from "../../utils/helper.js";

const keywords = ["test", "john", "sales", "crm", "lead", "vip"];

export function setupTest() {
  const res = login("CRMTensora1@test.com", "Password123");

  const token = res.json().data.access_token;

  return { token };
}

export default function (data) {
  const token = data.token;

  // ====================
  // GET LEADS
  // ====================

  const listRes = getLeads(token);

  const listSuccess = check(listRes, {
    "get leads": (r) => r && r.status === 200,
  });

  if (!listSuccess) {
    console.warn(`Get Leads Failed | Status=${listRes?.status}`);
    sleep(Math.random() * 2 + 1);
    return;
  }

  const body = safeJson(listRes);

  if (!body) {
    console.warn("Invalid JSON response");
    sleep(Math.random() * 2 + 1);
    return;
  }

  const leads = body?.data?.data || [];
  console.log("LEADS RESPONSE:", JSON.stringify(body, null, 2));

  // ====================
  // DETAIL LEAD
  // ====================

  let leadId = null;

  if (leads.length > 0) {
    const randomLead = leads[randomNumber(0, leads.length - 1)];

    leadId = randomLead.id;

    const detailRes = detailLead(token, leadId);

    check(detailRes, {
      "detail lead": (r) => r && r.status === 200,
    });
  }

  // ====================
  // SEARCH
  // ====================

  const keyword = randomFromArray(keywords);

  const searchRes = searchLead(token, keyword);

  check(searchRes, {
    "search leads": (r) => r && r.status === 200,
  });

  // ====================
  // FILTER
  // ====================

  const { startDate, endDate } = randomLast30DaysRange();
  const filterRes = filterLead(token, startDate, endDate);
  check(filterRes, {
    "filter lead": (r) => r && r.status === 200,
  });
}
