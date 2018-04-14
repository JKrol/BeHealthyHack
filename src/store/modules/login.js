import Vue from 'vue'
import router from '@/router'

const NOT_LOGGED_IN = "NOT_LOGGED_IN";
const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";
const LOGING_OUT = "LOGING_OUT";
const LOGOUT = "LOGOUT";

export default {
    state: {
        isLoggedIn: false,
        loginPending: true,
        loginError: ''
    },
    getters: {
        isLoggedIn: state => {
            return state.isLoggedIn
        },
        isLoginPending: state => {
            return state.loginPending
        },
        loginError: state => {
            return state.loginError
        }
    },
    actions: {
        login({ commit }, data) {

            console.log("Login")

            commit(LOGIN);

            return new Promise((resolve, reject) => {

                FB.login(function(response) {
                    console.log(response);
                    if(response.status == 'connected') {
                        commit(LOGIN_SUCCESS);
                        router.push({ name: 'main' });
                        resolve(response);
                    }
                    else {
                        commit(LOGIN_ERROR, response);
                        reject(response);
                    }
                }, {scope: 'public_profile,user_friends,user_location,user_birthday,user_likes,user_photos,user_posts,user_tagged_places,user_videos,user_events,user_managed_groups'});
            });
        },
        logout({ commit }) {
            commit(LOGING_OUT);

            FB.logout(function(response) {
                console.log(response)
                commit(LOGOUT);
                router.push({ name: 'login' });
            });
        },
        setLoggedIn({ commit }, isLoggedIn) {
            if(isLoggedIn) {
                commit(LOGIN_SUCCESS);
                router.push({ name: 'main' });
            }
            else {
                commit(NOT_LOGGED_IN);
            }
        }
    },
    mutations: {
        [NOT_LOGGED_IN] (state) {
            state.loginPending = false;
            state.isLoggedIn = false;
            state.loginError = '';
        },
        [LOGIN] (state) {
            state.loginPending = true;
            state.loginError = '';
        },
        [LOGIN_SUCCESS] (state) {
            state.isLoggedIn = true;
            state.loginPending = false;
            state.loginError = '';
        },
        [LOGIN_ERROR] (state, error) {
            state.loginError = error;
            state.loginPending = false;
        },
        [LOGING_OUT] (state) {
            state.loginPending = true;
            state.loginError = '';
        },
        [LOGOUT](state) {
            state.loginPending = false;
            state.loginError = '';
            state.isLoggedIn = false;
        }
    }
};
