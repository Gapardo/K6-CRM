export function buildEmailPayload(overrides = {}) {
  return {
    subject: "Test Email K6",
    body: "Ini email automation dari k6 stress test",
    status: "sent",
    recipients: JSON.stringify(["test@mail.com"]),
    ...overrides,
  };
}
