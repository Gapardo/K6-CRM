export const options = {
  vus: 10,
  duration: "5m",

  thresholds: {
    http_req_duration: ["p(95)<3000"],
    http_req_failed: ["rate<0.01"],
  },
};