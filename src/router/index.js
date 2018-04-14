import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TextToSpeechTest from '@/components/TextToSpeechTest'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/TextToSpeechTest',
      name: 'TextToSpeechTest',
      component: TextToSpeechTest
    }
  ]
})
