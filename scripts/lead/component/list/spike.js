import { options } from "../../../../config/spike.js";
import { generateReport } from "../../../../utils/reportHelper.js";

export { options };
export {
  setupTest as setup,
  default,
} from "../../../../scenarios/lead/leadListScenario.js";
export function handleSummary(data) {
  return generateReport(
    data,
    "reports/lead/list/spike-report.html"
  );
}