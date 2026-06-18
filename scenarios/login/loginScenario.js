import { check, sleep } from "k6";
import { login } from "../../services/authService.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export const options = {
  vus: 1,
  duration: "300s",
  thresholds: {
    http_req_duration: ["p(95)<2000"],
    http_req_failed: ["rate<0.01"],
  },
};


export default function () {
  const response = login("CRMTensora1@test.com", "Password123");
  let body = {};
  try {
    body = response.json();
  } catch (error) {
    console.log("========== ERROR RESPONSE ==========");
    console.log(`Status : ${response.status}`);
    console.log(`Body   : ${response.body}`);
    return;
  }
  check(response, {
    "status 200": (r) => r.status === 200,
    "success true": () => body.success === true,
    "access token exists": () => body.data?.access_token !== undefined,
    "response time < 2 sec": (r) => r.timings.duration < 2000,
  });
  sleep(1);
}
export function handleSummary(data) {
  return {
    "reports/login-report.html": htmlReport(data),

    stdout: textSummary(data, {
      indent: " ",
      enableColors: true,
    }),
  };
}
