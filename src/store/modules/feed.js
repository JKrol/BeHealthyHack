import Vue from 'vue'
import router from '@/router'

const SET_USER_FEED = "SET_USER_FEED";

export default {
    state: {
        usersFeed: []
    },
    getters: {
        userFeed: state => id => {
            return state.usersFeed[id];
        },
    },
    actions: {
        fetchUserFeed({ commit, dispatch, state }, userId) {
            return new Promise((resolve, reject) => {
                if(state.usersFeed[userId]) {
                    resolve(state.usersFeed[userId]);
                    return;
                } 
                
                FB.api(
                    `/${userId}/posts`,
                    function (response) {
                        if (response && !response.error) {
                           commit(SET_USER_FEED, { userId, feed: response.data });
                           resolve(state.usersFeed[userId]);
                        }
                        else {
                            reject(response.error);
                        }
                    }
                );
            });
            
        }
    },
    mutations: {
        [SET_USER_FEED] (state, data) {
            state.usersFeed[data.userId] = data.feed;
        },
    }
};
