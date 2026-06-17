import exec from "k6/execution";

export function buildLeadPayload() {
  const unique = `${exec.vu.idInTest}_${exec.scenario.iterationInTest}_${Date.now()}`;
  const phone = `+628${unique.replace(/\D/g, "").slice(-10)}`;

  return {
    owner_id: "1",
    first_name: `EL${unique}`,
    last_name: "Pardo",
    lead_source_id: "2",

    "professional_info[account_id]": "5",
    "professional_info[job_title]": "Performance Tester",
    "professional_info[email]": `ElPardo${unique}@mail.com`,
    "professional_info[phone_number]": phone,

    "personal_details[date_of_birth]": "",
    "social_media[whatsapp]": phone,
  };
}
