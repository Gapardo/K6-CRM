import loginScenario from "../../scenarios/login/loginScenario.js";
import { options } from "../../config/spike.js";
import { htmlReport } from "../../libs/k6-reporter.js";

export { options };

export default loginScenario;

export function handleSummary(data) {
  return {
    "reports/login/spike-report.html": htmlReport(data),
  };
}
