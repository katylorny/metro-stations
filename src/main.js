import Vue from 'vue'
import App from './App.vue'
import store from './store'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import InlineSvg from 'vue-inline-svg';

Vue.component('inline-svg', InlineSvg);
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

export const eventBus = new Vue()

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
