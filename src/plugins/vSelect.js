import vSelect from "vue-select";
import 'vue-select/dist/vue-select.css';

export function registerVSelect(app) {
  app.component("vSelect", vSelect);
}
