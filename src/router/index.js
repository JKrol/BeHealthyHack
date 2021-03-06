import Vue from 'vue'
import Router from 'vue-router'

import IndicoTest from '@/components/IndicoTest'
import AnalyzeEntities from '@/components/AnalyzeEntities'
import TextToSpeechTest from '@/components/TextToSpeechTest'
import SpeechToTextTest from '@/components/SpeechToTextTest'
import TextToSpeechTestPl from '@/components/TextToSpeechTestPl'
import SpeechToTextTestPl from '@/components/SpeechToTextTestPl'

Vue.use(Router)

import store from '@/store'

import Login from '@/pages/Login'
import SelectFriends from '@/pages/SelectFriends'
import Main from '@/pages/Main'
import Bot from '@/pages/Bot'

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
      path: '/friend/:id',
      name: 'main_selected',
      component: Main
    },
    {
      path: '/bot',
      name: 'bot',
      component: Bot
    },
    {
      path: '/IndicoTest',
      name: 'IndicoTest',
      component: IndicoTest
    },
    {
      path: '/AnalyzeEntities',
      name: 'AnalyzeEntities',
      component: AnalyzeEntities
    },
    {
      path: '/TextToSpeechTest',
      name: 'TextToSpeechTest',
      component: TextToSpeechTest
    },
    {
      path: '/TextToSpeechTestPl',
      name: 'TextToSpeechTestPl',
      component: TextToSpeechTestPl
    },
    {
      path: '/SpeechToTextTest',
      name: 'SpeechToTextTest',
      component: SpeechToTextTest    
    },
    {
      path: '/SpeechToTextTestPl',
      name: 'SpeechToTextTestPl',
      component: SpeechToTextTestPl    
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
