export function buildEditLeadPayload(overrides = {}) {
  const unique = `${Date.now()}`;

  const basePayload = {
    owner_id: "1",
    first_name: `EDIT_${unique}`,
    last_name: "UPDATED",
    lead_source_id: "2",

    "professional_info[account_id]": "5",
    "professional_info[job_title]": "QA Edited",
    "professional_info[email]": `edit${unique}@mail.com`,
    "professional_info[phone_number]": `+628${unique.slice(-10)}`,

    "personal_details[date_of_birth]": "",
    "social_media[whatsapp]": `+628${unique.slice(-10)}`,
  };

  return {
    ...basePayload,
    ...overrides,
  };
}
