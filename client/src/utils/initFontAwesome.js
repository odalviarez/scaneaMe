import { library } from "@fortawesome/fontawesome-svg-core";
import { faLink, faPowerOff, faUser, faTools } from "@fortawesome/free-solid-svg-icons";

function initFontAwesome() {
  library.add(faLink);
  library.add(faUser);
  library.add(faPowerOff);
  library.add(faTools);
}

export default initFontAwesome;
