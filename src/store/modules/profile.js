
const SET_ID = "SET_ID";
const SET_PROFILE = "SET_PROFILE";

export default {
    state: {
        userId: 0,
        userInfo: {
            name: '',
            picture: null
        }
    },
    getters: {
        userId: state => {
            return state.userId
        },
        userInfo: state => {
            return state.userInfo;
        }
    },
    actions: {
        setUserId({ commit }, userId) {
            return new Promise((resolve, reject) => {
                commit(SET_ID, userId);
                
                if(userId != 0) {
                    FB.api(
                        `/me`,
                        { fields: 'id, name, birthday, gender, picture' },
                        function (response) {
                            console.log(response);
                            if (response && !response.error) {
                                commit(SET_PROFILE, response);
                                resolve();
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
            }
            else {
                state.userInfo.name = data.name;
                state.userInfo.picture = data.picture.data.url;
            }
        }
    }
};