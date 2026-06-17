import { options } from "../../../../config/spike.js";

export { options };

export {
  setupTest as setup,
  default,
} from "../../../../scenarios/lead/leadCreateScenario.js";
export function handleSummary(data) {
  return generateReport(data, "reports/lead/create/spike-report.html");
}
export function handleSummary(data) {
  return generateReport(
    data,
    "reports/lead/create/soak-report.html"
  );
}