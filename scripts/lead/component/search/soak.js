import { options } from "../../../../config/soak.js";
import { generateReport } from "../../../../utils/reportHelper.js";

export { options };
export {
  setupTest as setup,
  default,
} from "../../../../scenarios/lead/leadSearchScenario.js";
export function handleSummary(data) {
  return generateReport(data, "reports/lead/search/soak-report.html");
}
