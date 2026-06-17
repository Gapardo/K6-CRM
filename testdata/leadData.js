export function generateLeadData() {
  const unique = `${Date.now()}${Math.floor(Math.random() * 10000)}`;

  return {
    first_name: `Perf${unique}`,
    last_name: "Testing",
    email: `perf${unique}@mail.com`,
    phone: `+628${unique.slice(-10)}`,
  };
}
