import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import login from './modules/login'
import profile from './modules/profile'

export default new Vuex.Store({
    modules: {
        login,
        profile
    }
})
