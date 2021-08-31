import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/base.css'
import './assets/css/ionfont.css'
import api from './api';
import i18n from './lang/index'
Vue.prototype.$api = api;
Vue.config.productionTip = false

//刷新获取本地的存储
let userinfo = localStorage.getItem('userinfo')
if(userinfo){
  let obj = JSON.parse(userinfo);
  store.commit('loginModule/setUser',obj);
}
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
