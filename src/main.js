import Vue from 'vue'
import App from './App.vue'
import router from "./router";

Vue.config.productionTip = false
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import vueDebounce from 'vue-debounce'
 
Vue.use(vueDebounce)
import { DatePicker } from 'ant-design-vue';
Vue.use(DatePicker);
import Antd from 'ant-design-vue';

import 'ant-design-vue/dist/antd.css';


Vue.use(Antd);
// import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
 
// Vue.use(Autocomplete)
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import store from "./store/index";
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

new Vue({
  router,
  
  store,
  render: h => h(App),
}).$mount('#app')
