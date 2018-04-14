import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import store from '@/store'

import HelloWorld from '@/components/HelloWorld'

import Login from '@/pages/Login'
import Main from '@/pages/Main'

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'main',
      component: Main
    }
  ]
});

router.beforeEach((to, from, next) => {
  if(to.name != 'login' && !store.getters.isLoggedIn) {
    next({ name: 'login' })
  }
  else {
    next();
  }
})

export default router;
