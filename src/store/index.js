import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import login from './modules/login'
import profile from './modules/profile'
import feed from './modules/feed'
import score from './modules/score'
import bot from './modules/bot'

export default new Vuex.Store({
    modules: {
        login,
        profile,
        feed,
        score,
        bot
    }
})
