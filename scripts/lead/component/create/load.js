import { options } from "../../../../config/load.js";
import { generateReport } from "../../../../utils/reportHelper.js";

export { options };

export {
  setupTest as setup,
  default,
} from "../../../../scenarios/lead/leadCreateScenario.js";

export function handleSummary(data) {
  return generateReport(data, "reports/lead/create/load-report.html");
}
