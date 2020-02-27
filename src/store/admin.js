import axios from 'axios';

const state = {
    admins: [],
    dependency: [],
};

const customGetters = {
    GET_ALL_ADMIN_DATA: function(state) {
        return state.admins;
    },
    GET_ADMIN_ROLE_DEPENDENCY: function(state) {
        if(state.dependency['roles']) {
            return state.dependency['roles'].map(role => {
                return {
                    'value': role.id,
                    'text': role.title
                };
            });
        }
    },
};

const customActions = {
    ACT_ALL_ADMINS: async function (context, payload) {
        context.commit('MUT_PAGE_LOADING_START', { root: true });
        await axios.get(`admins?page=${payload.next_page}`)
            .then(response => {
                let data = response.data.data;
                context.commit('MUT_ALL_ADMIN_DATA', data);
                context.commit('MUT_PAGINATION', data, { root: true });
                context.commit('MUT_PAGE_LOADING_END', { root: true });
            })
            .catch(exception => {
                context.commit('MUT_PAGE_LOADING_END', { root: true });
                console.log(exception);
            });
        context.commit('MUT_PAGE_LOADING_END', { root: true });
    },
    ACT_SEARCH_ADMINS: async function (context, payload) {
        await axios.get(`admins?page=${payload.next_page}&searchKeyword=${payload.searchKeyword}`)
            .then(response => {
                let data = response.data.data;
                context.commit('MUT_ALL_ADMIN_DATA', data);
                context.commit('MUT_PAGINATION', data, { root: true });
            })
            .catch(exception => {
                console.log(exception);
            });
    },
    ACT_DELETE_ADMIN: async function (context, id) {
        await axios.delete(`admins/delete/${id}`)
            .then(response => {
                context.commit('MUT_DELETE_POPUP_CLOSE', { root: true });
                context.dispatch('ACT_ALL_ADMINS', {
                    current_page: 1,
                    next_page: 1
                });
            })
            .catch(exception => {
                console.log(exception);
            });
    },
    ACT_STORE_ADMIN: async function (context, payload) {
        await axios.post(`admins/store`, payload)
            .then(response => {
                let data = response.data;
                context.commit('MUT_END_LOADING', { root: true });
                context.commit('MUT_NOTIFICATION', data, { root: true });
                if(data.success) {
                    context.commit('MUT_ALL_DIALOG_CLOSE', data, { root: true });
                    context.dispatch('ACT_ALL_ADMINS', {
                        current_page: 1,
                        next_page: 1
                    });
                }
            })
            .catch(exception => {
                console.log(exception);
            });
        context.commit('MUT_PAGE_LOADING_END', { root: true });
    },
    ACT_UPDATE_ADMIN: async function (context, payload) {
        await axios.post(`admins/update`, payload)
            .then(response => {
                let data = response.data;
                context.commit('MUT_END_LOADING', { root: true });
                context.commit('MUT_NOTIFICATION', data, { root: true });
                if(data.success) {
                    context.commit('MUT_ALL_DIALOG_CLOSE', data, { root: true });
                    context.dispatch('ACT_ALL_ADMINS', {
                        current_page: 1,
                        next_page: 1
                    });
                }
            })
            .catch(exception => {
                console.log(exception);
            });
        context.commit('MUT_PAGE_LOADING_END', { root: true });
    },
    ACT_DEPENDENCY_ADMIN: async function (context) {
        await axios.get(`admins/dependency/data`)
            .then(response => {
                let data = response.data;
                context.commit('MUT_ADMIN_DEPENDENCY', data);
            })
            .catch(exception => {
                console.log(exception);
            });
    },
};

const customMutations = {
    MUT_ALL_ADMIN_DATA: function (state, payload) {
        state.admins = payload.data;
    },
    MUT_ADMIN_DEPENDENCY: function (state, payload) {
        state.dependency = payload.data;
    },
};

export default {
    state,
    getters: customGetters,
    mutations: customMutations,
    actions: customActions
}