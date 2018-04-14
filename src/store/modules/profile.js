
const SET_ID = "SET_ID";
const SET_NAME = "SET_NAME";

export default {
    state: {
        userId: 0,
        userInfo: {
            name: ''
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
                        `/${userId}`,
                        function (response) {
                            if (response && !response.error) {
                                commit(SET_NAME, response.name);
                                resolve();
                            }
                            else {
                                reject();
                            }
                        }
                    );
                }
                else {
                    commit(SET_NAME, '');
                    resolve();
                }

            });
        }
    },
    mutations: {
        [SET_ID] (state, userId) {
            state.userId = userId;
        },
        [SET_NAME] (state, name) {
            state.userInfo.name = name;
        }
    }
};
