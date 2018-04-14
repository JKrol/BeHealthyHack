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
        login({ commit, dispatch }, data) {

            commit(LOGIN);

            return new Promise((resolve, reject) => {

                FB.login(function(response) {
                    console.log(response);
                    if(response.status == 'connected') {
                        dispatch('setUserId', response.authResponse.userID).then(() => {
                            commit(LOGIN_SUCCESS);
                            router.push({ name: 'main' });
                            resolve(response);
                        }).catch(() => {
                            commit(LOGIN_ERROR, "Unexpected error");
                            reject();
                        });
                    }
                    else {
                        commit(LOGIN_ERROR, response);
                        reject(response);
                    }
                }, {scope: 'public_profile,user_friends,user_location,user_birthday,user_likes,user_photos,user_posts,user_tagged_places,user_videos,user_events,user_managed_groups'});
            });
        },
        logout({ commit, dispatch }) {
            commit(LOGING_OUT);

            FB.logout(function(response) {
                dispatch('setUserId', 0).then(() => {
                    commit(LOGOUT);
                    router.push({ name: 'login' });
                }).catch(() => {
                    //TODO: handle error
                });
            });
        },
        setLoggedIn({ commit, dispatch }, userId) {
            if(userId) {
                dispatch('setUserId', userId).then(() => {
                    commit(LOGIN_SUCCESS);
                    router.push({ name: 'main' });
                }).catch(() => {
                    //TODO: handle error
                });
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
