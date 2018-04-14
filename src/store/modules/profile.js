import Vue from 'vue'
import router from '@/router'

const LS_SELECTED_FRIENDS = "SELECTED_FRIENDS";

const SET_ID = "SET_ID";
const SET_PROFILE = "SET_PROFILE";
const SET_SELECTED_FRIENDS = "SET_SELECTED_FRIENDS";

export default {
    state: {
        userId: 0,
        userInfo: {
            name: '',
            picture: null
        },
        friends: [],
        selectedFriendsIds: localStorage.getItem(LS_SELECTED_FRIENDS) ? JSON.parse(localStorage.getItem(LS_SELECTED_FRIENDS)) : []
    },
    getters: {
        userId: state => {
            return state.userId
        },
        userInfo: state => {
            return state.userInfo;
        },
        userAllFriends: state => {
            return state.friends;
        },
        userSelectedFriends: state => {
            return state.friends;
        },
        isSelected: state => {
            return state.selectedFriendsIds.length > 0;
        }
    },
    actions: {
        setUserId({ commit }, userId) {
            return new Promise((resolve, reject) => {
                commit(SET_ID, userId);
                
                if(userId != 0) {
                    FB.api(
                        `/me`,
                        { fields: 'id, name, birthday, gender, picture, friends' },
                        function (response) {
                            if (response && !response.error) {
                                //TODO: refactor
                                let fPromises = [];
                                response.friends.data.forEach(friend => {
                                    fPromises.push(new Promise(resolve => {
                                        FB.api(
                                            `/${friend.id}`,
                                            { fields: 'picture' },
                                            function (response) {
                                                if (response && !response.error) {
                                                    friend.picture = response.picture.data.url;
                                                }
                                                resolve();
                                            }
                                        );
                                    }));
                                });

                                Promise.all(fPromises)
                                    .then((results) => {
                                        commit(SET_PROFILE, response);
                                        resolve();
                                    })
                                    .catch((e) => {
                                        reject();
                                    });
                                
                            }
                            else {
                                reject();
                            }
                        }
                    );
                }
                else {
                    commit(SET_PROFILE, null);
                    resolve();
                }

            });
        },
        setSelectedFriends({ commit }, friends) {
            commit(SET_SELECTED_FRIENDS, friends);
            router.push({ name: 'main' });
        }
    },
    mutations: {
        [SET_ID] (state, userId) {
            state.userId = userId;
        },
        [SET_PROFILE] (state, data) {
            if(data == null) {
                state.userInfo.name = '';
                state.userInfo.picture = null;
                state.friends = [];
                state.selectedFriendsIds = [];
                localStorage.removeItem(LS_SELECTED_FRIENDS);
            }
            else {
                state.userInfo.name = data.name;
                state.userInfo.picture = data.picture.data.url;
                state.friends = data.friends.data;
            }
        },
        [SET_SELECTED_FRIENDS] (state, friends) {
            localStorage.setItem(LS_SELECTED_FRIENDS, JSON.stringify(friends));
            state.selectedFriendsIds = friends;
        },
    }
};
