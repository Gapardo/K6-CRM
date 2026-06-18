import loginScenario from "../../scenarios/login/loginScenario.js";
import { options } from "../../config/load.js";
import { htmlReport } from "../../libs/k6-reporter.js";

export { options };

export default loginScenario;

export function handleSummary(data) {
  return {
    "reports/login/load-report.html": htmlReport(data),
  };
}
