import Vue from 'vue'
import App from './App.vue'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import VueRouter from 'vue-router';
import {routes} from './router.js';
import {store} from "./store"

import axios from 'axios'
import VueAxios from 'vue-axios'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

Vue.use(VueAxios, axios)

Vue.use(VueRouter);
Vue.use(iView);
const router =new VueRouter({
  routes,
  mode:'hash'
}) 
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
