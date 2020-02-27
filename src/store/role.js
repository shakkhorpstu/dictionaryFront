import axios from 'axios';

const state = {
    roles: [],
    dependency: []
};

const customGetters = {
    GET_ALL_ROLE_DATA: function(state) {
        return state.roles;
    },
    GET_ROLE_DEPENDENCY: function(state) {
        if(state.dependency['menus']) {
            return state.dependency['menus'].map(menu => {
                return {
                    'value': menu.id,
                    'text': menu.name,
                };
            });
        }
    },
};

const customActions = {
    ACT_ALL_ROLES: async function (context, payload) {
        context.commit('MUT_PAGE_LOADING_START', { root: true });
        await axios.get(`admin-roles?page=${payload.next_page}`)
            .then(response => {
                let data = response.data.data;
                context.commit('MUT_ALL_ROLE_DATA', data);
                context.commit('MUT_PAGINATION', data, { root: true });
                context.commit('MUT_PAGE_LOADING_END', { root: true });
            })
            .catch(exception => {
                context.commit('MUT_PAGE_LOADING_END', { root: true });
                console.log(exception);
            });
        context.commit('MUT_PAGE_LOADING_END', { root: true });
    },
    ACT_SEARCH_ROLES: async function (context, payload) {
        await axios.get(`admin-roles?page=${payload.next_page}&searchKeyword=${payload.searchKeyword}`)
            .then(response => {
                let data = response.data.data;
                context.commit('MUT_ALL_ROLE_DATA', data);
                context.commit('MUT_PAGINATION', data, { root: true });
            })
            .catch(exception => {
                console.log(exception);
            });
    },
    ACT_DELETE_ROLE: async function (context, id) {
        await axios.delete(`admin-roles/delete/${id}`)
            .then(response => {
                context.commit('MUT_DELETE_POPUP_CLOSE', { root: true });
                context.dispatch('ACT_ALL_ROLES', {
                    current_page: 1,
                    next_page: 1
                });
            })
            .catch(exception => {
                console.log(exception);
            });
    },
    ACT_STORE_ROLE: async function (context, payload) {
        await axios.post(`admin-roles/store`, payload)
            .then(response => {
                let data = response.data;
                context.commit('MUT_END_LOADING', { root: true });
                context.commit('MUT_NOTIFICATION', data, { root: true });
                if(data.success) {
                    context.commit('MUT_ALL_DIALOG_CLOSE', data, { root: true });
                    context.dispatch('ACT_ALL_ROLES', {
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
    ACT_UPDATE_ROLE: async function (context, payload) {
        await axios.post(`admin-roles/update`, payload)
            .then(response => {
                let data = response.data;
                context.commit('MUT_END_LOADING', { root: true });
                context.commit('MUT_NOTIFICATION', data, { root: true });
                if(data.success) {
                    context.commit('MUT_ALL_DIALOG_CLOSE', data, { root: true });
                    context.dispatch('ACT_ALL_ROLES', {
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
    ACT_DEPENDENCY_ROLE: async function (context) {
        await axios.get(`admin-roles/dependency/data`)
            .then(response => {
                let data = response.data;
                context.commit('MUT_ROLE_DEPENDENCY', data);
            })
            .catch(exception => {
                console.log(exception);
            });
    },
};

const customMutations = {
    MUT_ALL_ROLE_DATA: function (state, payload) {
        state.roles = payload.data;
    },
    MUT_ROLE_DEPENDENCY: function (state, payload) {
        state.dependency = payload.data;
    },
};

export default {
    state,
    getters: customGetters,
    mutations: customMutations,
    actions: customActions
}