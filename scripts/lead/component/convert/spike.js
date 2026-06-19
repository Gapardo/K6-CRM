import { options } from "../../../../config/spike.js";
import { generateReport } from "../../../../utils/reportHelper.js";

export { options };

export {
  setupTest as setup,
  default,
} from "../../../../scenarios/lead/leadConvertScenario.js";
