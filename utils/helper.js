export function isSuccessResponse(response) {
  return (
    response &&
    response.status === 200 &&
    response.body &&
    response.error === ""
  );
}

// utils/helper.js
export function safeJson(response) {
  try {
    return JSON.parse(response.body);
  } catch (e) {
    console.error("JSON parse error:", e.message);
    return null;
  }
}

export function getLatestLeadId(listResponse) {
  const body = JSON.parse(listResponse.body);

  return body?.data?.[0]?.id || null;
}

export function toMultipart(payload) {
  const formData = {};

  Object.entries(payload).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") {
      formData[k] = String(v);
    }
  });

  formData["contact_image"] = http.file([], "empty.jpg", "image/jpeg");

  return formData;
}
