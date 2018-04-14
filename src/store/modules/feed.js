import Vue from 'vue'
import router from '@/router'

import indico from "@/modules/indico"

const SET_USER_FEED = "SET_USER_FEED";
const SET_USER_FEED_SCORE = "SET_USER_FEED_SCORE";

const mapScore = score => {
    if(!score)
        return null;

    if(score < 0.33)
        return {
            name: 'BAD',
            color: 'red',
            icon: ''
        };
    
    if(score < 0.66)
        return {
            name: 'NEUTRAL',
            color: 'black',
            icon: ''
        };

    return {
        name: 'GOOD',
        color: 'green',
        icon: ''
    };
}

export default {
    state: {
        usersFeed: [],
        usersFeedScore: [],
    },
    getters: {
        userFeed: state => id => {
            return state.usersFeed[id];
        },
        userFeedScore: state => id => {
            return mapScore(state.usersFeedScore[id]);
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
        },
        getFeedScore({ commit, dispatch, state }, userId) {
            return new Promise((resolve, reject) => {
                if(state.usersFeedScore[userId]) {
                    resolve(mapScore(state.usersFeedScore[userId]));
                    return;
                } 

                var data = state.usersFeed[userId].filter(feed => feed.message).map(feed => feed.message);

                indico.getSentimentFromText(data).then(result => {
                    const sum = result.reduce(function(a, b) { return a + b; });
                    const avg = sum / result.length;
                    commit(SET_USER_FEED_SCORE, { userId, feed: avg });
                    resolve(mapScore(avg));
                }).catch(err => reject(err));
            });
        }
    },
    mutations: {
        [SET_USER_FEED] (state, data) {
            state.usersFeed[data.userId] = data.feed;
        },
        [SET_USER_FEED_SCORE] (state, data) {
            state.usersFeedScore[data.userId] = data.score;
        },
    }
};
