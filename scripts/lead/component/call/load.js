import { options } from "../../../../config/load.js";
import { generateReport } from "../../../../utils/reportHelper.js";

export { options };

export {
  setupTest as setup,
  default,
} from "../../../../scenarios/lead/callLeadScenario.js";

