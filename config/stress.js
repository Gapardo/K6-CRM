export const options = {
  stages: [
    { duration: "1m", target: 10 },
    { duration: "1m", target: 50 },
    { duration: "1m", target: 100 },
    // { duration: "1m", target: 200 },
    // { duration: "1m", target: 300 },
    // { duration: "1m", target: 500 },
    // { duration: "1m", target: 1000 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<5000"],
    http_req_failed: ["rate<0.05"],
  },
};
