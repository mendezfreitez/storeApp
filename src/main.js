import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import VueMeta from 'vue-meta'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './editor/css/jquery.miniColors.css';
import './editor/css/jquery.simplecolorpicker.css';
import VueCurrencyFilter from 'vue-currency-filter'
import Numeric from '../src/ArchivosJavaScript/jquery.numeric-min'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import 'fabric';
import 'canvas';
import EasySlider from 'vue-easy-slider'
import Carousel3d from 'vue-carousel-3d';

Vue.use(VueMeta);
Vue.use(Carousel3d);
Vue.use(EasySlider);
import './editor/js/bootstrap.js';
import store from './store'
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(Numeric)
Vue.use(VueSidebarMenu)     
Vue.use(VueCurrencyFilter, {
  symbol: '$',
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: false
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
