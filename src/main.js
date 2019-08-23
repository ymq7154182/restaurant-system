// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import App from './App'
import vueTap from 'vue-js-tap'
import { ToastPlugin, ConfirmPlugin, LoadingPlugin, Calendar, DatetimePlugin, Search } from 'vux'
import qs from 'qs'
import axios from 'axios'
import 'lib-flexible'

Vue.prototype.$axios = axios

Vue.use(VueRouter)
Vue.use(vueTap)

Vue.prototype.$qs = qs

Vue.component('calendar', Calendar)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(DatetimePlugin)
Vue.component('search', Search)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
