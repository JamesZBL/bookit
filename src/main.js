// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from '@/store';

// MintUI
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
Vue.component('font-awesome-icon', FontAwesomeIcon);
import { faCaretDown, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';
library.add(faCaretDown);
library.add(faSortAmountUp);

// Onsen UI
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import VueOnsen from 'vue-onsenui';
Vue.use(VueOnsen);
VueOnsen.disableAutoStyling();

// Vue-Sortable
import Sortable from 'vue-sortable';
Vue.use(Sortable);

// Vue2-transitions
import Transitions from 'vue2-transitions';
Vue.use(Transitions);

// Vue-Observe-Visibility
import VueObserveVisibility from 'vue-observe-visibility';
Vue.use(VueObserveVisibility);

// Bootstrap-Vue
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);

// Vuetify
import Vuetify from 'vuetify';
import config from '@/theme/vuetify';
Vue.use(Vuetify, {
  iconfont: 'md',
  config
});
import 'vuetify/dist/vuetify.min.css';

// MD-icon
import 'material-design-icons-iconfont/dist/material-design-icons.css';

// Vue-Touch
import VueTouch from 'vue-touch';
VueTouch, { name: 'v-touch' };

// Accounting
import accounting from 'accounting';
accounting.settings = {
  currency: {
    symbol: "￥",
    format: "%s%v",
    decimal: ".",
    thousand: ",",
    precision: 2
  },
  number: {
    precision: 0,
    thousand: "",
    decimal: "."
  }
};

// Vueg
import vueg from 'vueg';
Vue.use(vueg, router, {
  enter: 'fadeInRight',
  leave: 'bounceOut'
});

// Customed components
import Title from '@/components/Title';
import Button from '@/components/Button';
Vue.component('c-title', Title);
Vue.component('btn', Button);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#vapp',
  store,
  router,
  components: { App },
  template: '<App/>'
});
