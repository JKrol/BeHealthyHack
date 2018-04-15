// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import * as firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBUwHSCX-0uwTwWfs88B7HOJGzFKjV4Ris",
  authDomain: "behealthyhack.firebaseapp.com",
  databaseURL: "https://behealthyhack.firebaseio.com",
  projectId: "behealthyhack",
  storageBucket: "behealthyhack.appspot.com",
  messagingSenderId: "419146415315"
};
firebase.initializeApp(config);

import Vue from 'vue'
import App from './App'

import router from './router'
import store from './store'

import VueResources from 'vue-resource'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import fb from './fb'

Vue.use(Vuetify, { theme: {
  primary: '#ee44aa',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.use(VueResources);

// Vue.http.headers.common['Access-Control-Request-Method'] = 'X-Requested-With, Authorization'

Vue.config.productionTip = false

fb.init();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
