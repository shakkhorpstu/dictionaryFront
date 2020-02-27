import axios from 'axios';
import router from '../router';

const state = {
    users: [],
    user: {},
    dependency: []
};

const customGetters = {
    GET_ALL_USER_DATA: function(state) {
        return state.users;
    },
    GET_USER_COUNTRY_DEPENDENCY: function(state) {
        if(state.dependency['countries']) {
            return state.dependency['countries'].map(country => {
                return {
                    'value': country.id,
                    'text': country.name
                };
            });
        }
    },
    GET_SINGLE_USER: function(state) {
        return state.user;
    }
};

const customActions = {
    ACT_ALL_USERS: async function (context, payload) {
        context.commit('MUT_PAGE_LOADING_START', { root: true });
        await axios.get(`users?page=${payload.next_page}`)
            .then(response => {
                let data = response.data.data;
                context.commit('MUT_ALL_USER_DATA', data);
                context.commit('MUT_PAGINATION', data, { root: true });
                context.commit('MUT_PAGE_LOADING_END', { root: true });
            })
            .catch(exception => {
                context.commit('MUT_PAGE_LOADING_END', { root: true });
                console.log(exception);
            });
        context.commit('MUT_PAGE_LOADING_END', { root: true });
    },
    ACT_SEARCH_USERS: async function (context, payload) {
        await axios.get(`users?page=${payload.next_page}&searchKeyword=${payload.searchKeyword}`)
            .then(response => {
                let data = response.data.data;
                context.commit('MUT_ALL_USER_DATA', data);
                context.commit('MUT_PAGINATION', data, { root: true });
            })
            .catch(exception => {
                console.log(exception);
            });
    },
    ACT_DELETE_USER: async function (context, id) {
        await axios.delete(`users/delete/${id}`)
            .then(response => {
                context.commit('MUT_DELETE_POPUP_CLOSE', { root: true });
                context.dispatch('ACT_ALL_USERS', {
                    current_page: 1,
                    next_page: 1
                });
            })
            .catch(exception => {
                console.log(exception);
            });
    },
    ACT_STORE_USER: async function (context, payload) {
        await axios.post(`users/store`, payload)
            .then(response => {
                let data = response.data;
                context.commit('MUT_END_LOADING', { root: true });
                context.commit('MUT_NOTIFICATION', data, { root: true });
                context.commit('MUT_ALL_DIALOG_CLOSE', data, { root: true });
                if(data,success) {
                    router.push({name: 'users'});
                }
            })
            .catch(exception => {
                console.log(exception);
            });
        context.commit('MUT_PAGE_LOADING_END', { root: true });
    },
    ACT_UPDATE_USER: async function (context, payload) {
        await axios.post(`users/update`, payload)
            .then(response => {
                let data = response.data;
                context.commit('MUT_END_LOADING', { root: true });
                context.commit('MUT_NOTIFICATION', data, { root: true });
                context.commit('MUT_ALL_DIALOG_CLOSE', data, { root: true });
                if(data,success) {
                    router.push({name: 'users'});
                }
            })
            .catch(exception => {
                console.log(exception);
            });
        context.commit('MUT_PAGE_LOADING_END', { root: true });
    },
    ACT_DEPENDENCY_USER: async function (context) {
        await axios.get(`users/dependency/data`)
            .then(response => {
                let data = response.data;
                context.commit('MUT_USER_DEPENDENCY', data);
            })
            .catch(exception => {
                console.log(exception);
            });
    },
    ACT_SINGLE_USER: async function (context, id) {
        await axios.get(`users/${id}`)
            .then(response => {
                let data = response.data;
                context.commit('MUT_SINGLE_USER', data);
            })
            .catch(exception => {
                console.log(exception);
            });
    },
};

const customMutations = {
    MUT_ALL_USER_DATA: function (state, payload) {
        state.users = payload.data;
    },
    MUT_USER_DEPENDENCY: function (state, payload) {
        state.dependency = payload.data;
    },
    MUT_SINGLE_USER: function (state, payload) {
        state.user = payload.data;
        if(payload.data.profile) {
            state.user.website = payload.data.profile.website;
            state.user.facebook_link = payload.data.profile.facebook_link;
            state.user.github_link = payload.data.profile.github_link;
            delete state.user.profile;
        }
    }
};

export default {
    state,
    getters: customGetters,
    mutations: customMutations,
    actions: customActions
}