import Vue from 'vue'
import router from '@/router'

const LS_BOT_LOG = "BOT_LOG";

const SET_BOT_HISTORY = "SET_BOT_HISTORY";

export default {
    state: {
        history: localStorage.getItem(LS_BOT_LOG) ? JSON.parse(localStorage.getItem(LS_BOT_LOG)) : [],
    },
    getters: {
        getHistory: state => {
            return state.history;
        }
    },
    actions: {
        addToHistory({ state, commit }, item) {
            state.history.push(item);
            commit(SET_BOT_HISTORY, state.history);
        },
        updateHistory({ state, commit }, data) {
            commit(SET_BOT_HISTORY, history);
        }
    },
    mutations: {
        [SET_BOT_HISTORY](state, data) {
            state.history = data;
            const history = JSON.stringify(data);
            localStorage.setItem(LS_BOT_LOG, history);
        }
    }
};
