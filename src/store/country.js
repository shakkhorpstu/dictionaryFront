import axios from 'axios';

const state = {
    countries: [],
};

const customGetters = {
    GET_ALL_COUNTRY_DATA: function(state) {
        return state.countries;
    }
};

const customActions = {
    ACT_ALL_COUNTRIES: async function (context, payload) {
        context.commit('MUT_PAGE_LOADING_START', { root: true });
        await axios.get(`countries?page=${payload.next_page}`)
            .then(response => {
                let data = response.data.data;
                context.commit('MUT_ALL_COUNTRY_DATA', data);
                context.commit('MUT_PAGINATION', data, { root: true });
                context.commit('MUT_PAGE_LOADING_END', { root: true });
            })
            .catch(exception => {
                context.commit('MUT_PAGE_LOADING_END', { root: true });
                console.log(exception);
            });
        context.commit('MUT_PAGE_LOADING_END', { root: true });
    },
    ACT_SEARCH_COUNTRIES: async function (context, payload) {
        await axios.get(`countries?page=${payload.next_page}&searchKeyword=${payload.searchKeyword}`)
            .then(response => {
                let data = response.data.data;
                context.commit('MUT_ALL_COUNTRY_DATA', data);
                context.commit('MUT_PAGINATION', data, { root: true });
            })
            .catch(exception => {
                console.log(exception);
            });
    },
    ACT_DELETE_COUNTRY: async function (context, id) {
        await axios.delete(`countries/delete/${id}`)
            .then(response => {
                context.commit('MUT_DELETE_POPUP_CLOSE', { root: true });
                context.dispatch('ACT_ALL_COUNTRIES', {
                    current_page: 1,
                    next_page: 1
                });
            })
            .catch(exception => {
                console.log(exception);
            });
    },
    ACT_STORE_COUNTRY: async function (context, payload) {
        await axios.post(`countries/store`, payload)
            .then(response => {
                let data = response.data;
                context.commit('MUT_END_LOADING', { root: true });
                context.commit('MUT_NOTIFICATION', data, { root: true });
                if(data.success) {
                    context.commit('MUT_ALL_DIALOG_CLOSE', data, { root: true });
                    context.dispatch('ACT_ALL_COUNTRIES', {
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
    ACT_UPDATE_COUNTRY: async function (context, payload) {
        await axios.post(`countries/update`, payload)
            .then(response => {
                let data = response.data;
                context.commit('MUT_END_LOADING', { root: true });
                context.commit('MUT_NOTIFICATION', data, { root: true });
                if(data.success) {
                    context.commit('MUT_ALL_DIALOG_CLOSE', data, { root: true });
                    context.dispatch('ACT_ALL_COUNTRIES', {
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
};

const customMutations = {
    MUT_ALL_COUNTRY_DATA: function (state, payload) {
        state.countries = payload.data;
    }
};

export default {
    state,
    getters: customGetters,
    mutations: customMutations,
    actions: customActions
}