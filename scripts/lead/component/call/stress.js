import { options } from "../../../../config/stress.js";
import { generateReport } from "../../../../utils/reportHelper.js";

export { options };

export {
  setupTest as setup,
  default,
} from "../../../../scenarios/lead/callLeadScenario.js";
