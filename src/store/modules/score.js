import Vue from 'vue'
import router from '@/router'

import indico from "@/modules/indico"

const SET_USER_FEED_SCORE = "SET_USER_FEED_SCORE";
const SET_MSG_SCORE = "SET_MSG_SCORE";
const SET_IMG_SCORE = "SET_IMG_SCORE";

const mapScore = score => {
    if(!score)
        return null;

    if(score < 0.33 || (score.Sad && score.Sad > score.Happy && score.Sad > score.Neutral))
        return {
            name: 'BAD',
            color: 'red',
            icon: ''
        };
    
    if(score < 0.66 || (score.Neutral && score.Neutral > score.Happy && score.Neutral > score.Sad))
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
        usersFeedScore: [],
        messageScore: [],
        imageScore: []
    },
    getters: {
        userFeedScore: state => id => {
            return mapScore(state.usersFeedScore[id]);
        },
    },
    actions: {
        getFeedScore({ commit, dispatch, state, rootState }, userId) {
            return new Promise((resolve, reject) => {
                if(state.usersFeedScore[userId]) {
                    resolve(mapScore(state.usersFeedScore[userId]));
                    return;
                } 

                var data = rootState.feed.usersFeed[userId].filter(feed => feed.message).map(feed => feed.message);

                indico.getSentimentFromList(data).then(result => {
                    const sum = result.reduce(function(a, b) { return a + b; });
                    const avg = sum / result.length;
                    commit(SET_USER_FEED_SCORE, { userId, feed: avg });
                    resolve(mapScore(avg));
                }).catch(err => reject(err));
            });
        },
        getMessageScore({ commit, dispatch, state, rootState }, msg) {
            return new Promise((resolve, reject) => {
                if(state.messageScore[msg.id]) {
                    resolve(mapScore(state.messageScore[msg.id]));
                    return;
                } 
                indico.getSentimentFromText(msg.message).then(result => {
                    resolve(mapScore(result));
                }).catch(err => reject(err));
            });
        },
        getPhotoScore({ commit, dispatch, state, rootState }, photo) {
            return new Promise((resolve, reject) => {
                if(state.imageScore[photo.id]) {
                    resolve(mapScore(state.imageScore[photo.id]));
                    return;
                } 
                indico.getSentimentFromImg(photo.url).then(result => {
                    resolve(mapScore(result));
                }).catch(err => reject(err));
            });
        },
    },
    mutations: {
        [SET_USER_FEED_SCORE] (state, data) {
            state.usersFeedScore[data.userId] = data.score;
        },
        [SET_MSG_SCORE] (state, data) {
            state.messageScore[data.id] = data.score;
        },
        [SET_IMG_SCORE] (state, data) {
            state.imageScore[data.id] = data.score;
        },
    }
};
