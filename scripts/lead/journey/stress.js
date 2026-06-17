import { htmlReport } from "../../../libs/k6-reporter.js";
import { options } from "../../../config/stress.js";
import { setupTest } from "../../../scenarios/lead/leadJourneyScenario.js";

export { options };
export { setupTest as setup };
export { default } from "../../../scenarios/lead/leadJourneyScenario.js";

export function handleSummary(data) {
  return {
    "reports/stress-report.html": htmlReport(data),
  };
}