export const options = {
  vus: 1,
  duration: "1m",

  thresholds: {
    http_req_duration: ["p(95)<3000"],
    http_req_failed: ["rate<0.01"],
  },
};