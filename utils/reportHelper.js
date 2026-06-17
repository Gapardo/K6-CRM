// utils/reportHelper.js

import { htmlReport } from "../libs/k6-reporter.js";

export function generateReport(data, path) {
  return {
    [path]: htmlReport(data),
  };
}