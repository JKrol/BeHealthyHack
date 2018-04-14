import Vue from 'vue'
import Router from 'vue-router'
import IndicoTest from '@/components/IndicoTest'
import TextToSpeechTest from '@/components/TextToSpeechTest'
import SpeechToTextTest from '@/components/SpeechToTextTest'

Vue.use(Router)

import store from '@/store'

import HelloWorld from '@/components/HelloWorld'

import Login from '@/pages/Login'
import SelectFriends from '@/pages/SelectFriends'
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
      path: '/select',
      name: 'select_friends',
      component: SelectFriends
    },
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/IndicoTest',
      name: 'IndicoTest',
      component: IndicoTest
    },
    {
      path: '/TextToSpeechTest',
      name: 'TextToSpeechTest',
      component: TextToSpeechTest
    },
    {
      path: '/SpeechToTextTest',
      name: 'SpeechToTextTest',
      component: SpeechToTextTest
    }
  ]
});

router.beforeEach((to, from, next) => {
  if(to.name != 'login' && !store.getters.isLoggedIn) {
    next({ name: 'login' })
  }
  else if(to.name != 'select_friends' && store.getters.isLoggedIn && !store.getters.isSelected) {
    next({ name: 'select_friends' })
  }
  else {
    next();
  }
})

export default router;
