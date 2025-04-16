import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import ToastService from "primevue/toastservice";
// import Button from "primevue/button";
// import Drawer from "primevue/drawer";
// import Ripple from "primevue/ripple";
// import Avatar from "primevue/avatar";
// import StyleClass from "primevue/styleclass";
// import SelectButton from "primevue/selectbutton";
// import "primeicons/primeicons.css";

import router from "./router";
// import "./style.css";
import "@/assets/styles.css";
import App from "./App.vue";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: ".app-dark",
    },
    // options: {
    //   prefix: "p",
    //   darkModeSelector: "system",
    //   cssLayer: false,
    // },
  },
  // ripple: true,
});
app.use(router);
app.use(ToastService);

// app.component("Button", Button);
// app.component("Drawer", Drawer);
// app.component("Avatar", Avatar);
// app.component("SelectButton", SelectButton);

// app.directive("ripple", Ripple);
// app.directive("styleclass", StyleClass);

app.mount("#app");
