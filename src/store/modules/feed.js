import Vue from 'vue'
import router from '@/router'

const SET_USER_FEED = "SET_USER_FEED";
const SET_USER_PHOTOS = "SET_USER_PHOTOS";
const SET_PHOTO = "SET_PHOTO";

export default {
    state: {
        usersFeed: [],
        usersPhotos: [],
        photos: [],
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
        },
        fetchUserPhotos({ commit, dispatch, state }, userId) {
            return new Promise((resolve, reject) => {
                if(state.usersPhotos[userId]) {
                    resolve(state.usersPhotos[userId]);
                    return;
                } 
                
                FB.api(
                    `/${userId}/photos/uploaded`,
                    function (response) {
                        if (response && !response.error) {
                           commit(SET_USER_PHOTOS, { userId, photos: response.data });
                           resolve(state.usersPhotos[userId]);
                        }
                        else {
                            reject(response.error);
                        }
                    }
                );
            });
        },
        fetchPhoto({ commit, dispatch, state }, photoId) {
            return new Promise((resolve, reject) => {
                if(state.photos[photoId]) {
                    resolve(state.photos[photoId]);
                    return;
                } 
                
                FB.api(
                    `/${photoId}`,
                    { fields: 'id, images, created_time' },
                    function (response) {
                        if (response && !response.error) {
                           commit(SET_PHOTO, { photoId, photo: response });
                           resolve(state.photos[photoId]);
                        }
                        else {
                            reject(response.error);
                        }
                    }
                );
            });
        },
        getTimeline({ commit, dispatch, state }, userId) {
            return new Promise(resolve => {
                dispatch('fetchUserFeed', userId).then(feed => {
                    feed = feed.filter(item => item.message)
                            .map(item => { 
                                item.type = 'MSG'; 
                                return item; 
                            });

                    const msgPromises = [];
                    feed.forEach(element => {
                        if(element.type != "MSG")
                            return;

                        msgPromises.push(new Promise(resolve => {
                            dispatch('getMessageScore', element).then(score => {
                                element.score = score;
                                resolve();
                            });
                        }));
                    });

                    Promise.all(msgPromises).then(() => {
                        dispatch('fetchUserPhotos', userId).then(photos => {
                            photos = photos.map(item => {
                                item.type = "IMG";
                                return item;
                            });
    
                            var timeline = feed.concat(photos);
    
                            timeline.sort(function(a, b) {
                                return new Date(b.created_time) - new Date(a.created_time);;
                            });
    
                            const promises = [];
                            timeline.forEach(element => {
                                if(element.type != "IMG")
                                    return;
    
                                promises.push(new Promise(resolve => {
                                    dispatch('fetchPhoto', element.id).then(photo => {
                                        element.url = photo.images[5].source;
                                        resolve();
                                    });
                                }));
                            });
    
                            Promise.all(promises).then(() => {
                                const imgPromises = [];
                                timeline.forEach(element => {
                                    if(element.type != "IMG")
                                        return;

                                    imgPromises.push(new Promise(resolve => {
                                        dispatch('getPhotoScore', element).then(score => {
                                            element.score = score;
                                            resolve();
                                        });
                                    }));

                                    Promise.all(imgPromises).then(() => {
                                        resolve(timeline);
                                    });
                                });
                            });
                        });
                    });
                    
                });
            }); 
        }
    },
    mutations: {
        [SET_USER_FEED] (state, data) {
            state.usersFeed[data.userId] = data.feed;
        },
        [SET_USER_PHOTOS] (state, data) {
            state.usersPhotos[data.userId] = data.photos;
        },
        [SET_PHOTO] (state, data) {
            state.photos[data.photoId] = data.photo;
        },
    }
};
