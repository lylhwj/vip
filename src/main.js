// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' 
import Vuex from 'vuex'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store' // vuex config
import * as filters from './filters'
import mixins from './mixins'
import VueClipboard from 'vue-clipboard2'
import axios from 'axios'
Vue.prototype.axios = axios 
axios.defaults.withCredentials=true;
Vue.use(VueClipboard)
Vue.use(ElementUI);//ele
// sync the router with the vuex store.
// this registers `store.state.route`
// sync(store, router) 
// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// register global mixins.
Vue.mixin(mixins)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
