import axios from 'axios';
import router from '../router'

const state = {
    pages: [],
    page: {},
    dependency: []
};

const customGetters = {
    GET_ALL_PAGE_DATA: function(state) {
        return state.pages;
    },
    GET_SINGLE_PAGE: function(state) {
        return state.page;
    },
    GET_PAGE_LANGUAGE_DEPENDENCY: function(state) {
        if(state.dependency['languages']) {
            return state.dependency['languages'].map(language => {
                return {
                    'value': language.id,
                    'text': language.name
                };
            });
        }
    },
};

const customActions = {
    ACT_ALL_PAGES: async function (context, payload) {
        context.commit('MUT_PAGE_LOADING_START', { root: true });
        await axios.get(`pages?page=${payload.next_page}`)
            .then(response => {
                let data = response.data.data;
                context.commit('MUT_ALL_PAGE_DATA', data);
                context.commit('MUT_PAGINATION', data, { root: true });
                context.commit('MUT_PAGE_LOADING_END', { root: true });
            })
            .catch(exception => {
                context.commit('MUT_PAGE_LOADING_END', { root: true });
                console.log(exception);
            });
        context.commit('MUT_PAGE_LOADING_END', { root: true });
    },
    ACT_SEARCH_PAGES: async function (context, payload) {
        await axios.get(`pages?page=${payload.next_page}&searchKeyword=${payload.searchKeyword}`)
            .then(response => {
                let data = response.data.data;
                context.commit('MUT_ALL_PAGE_DATA', data);
                context.commit('MUT_PAGINATION', data, { root: true });
            })
            .catch(exception => {
                console.log(exception);
            });
    },
    ACT_DELETE_PAGE: async function (context, id) {
        await axios.delete(`pages/delete/${id}`)
            .then(response => {
                context.commit('MUT_DELETE_POPUP_CLOSE', { root: true });
                context.dispatch('ACT_ALL_PAGES', {
                    current_page: 1,
                    next_page: 1
                });
            })
            .catch(exception => {
                console.log(exception);
            });
    },
    ACT_DEPENDENCY_PAGE: async function (context) {
        await axios.get(`pages/dependency/data`)
            .then(response => {
                let data = response.data;
                context.commit('MUT_PAGE_DEPENDENCY', data);
            })
            .catch(exception => {
                console.log(exception);
            });
    },
    ACT_STORE_PAGE: async function (context, payload) {
        await axios.post(`pages/store`, payload)
            .then(response => {
                let data = response.data;
                context.commit('MUT_END_LOADING', { root: true });
                context.commit('MUT_NOTIFICATION', data, { root: true });
                if(data.success) {
                    router.push({name: 'pages'});
                }
            })
            .catch(exception => {
                console.log(exception);
            });
        context.commit('MUT_PAGE_LOADING_END', { root: true });
    },
    ACT_SINGLE_PAGE: async function (context, id) {
        await axios.get(`pages/${id}`)
            .then(response => {
                let data = response.data;
                context.commit('MUT_SINGLE_PAGE', data);
            })
            .catch(exception => {
                console.log(exception);
            });
    },
    ACT_UPDATE_PAGE: async function (context, payload) {
        await axios.post(`pages/update`, payload.singlePage)
            .then(response => {
                let data = response.data;
                if(data.success) {
                    if(payload.hasImage) {
                        axios.post(`pages/update/image/${payload.singlePage.id}`, payload.image)
                            .then(imgResponse => {
                                console.log(imgResponse.data);
                            })
                            .catch(e => {
                                console.log(e);
                            });
                    }
                }

                context.commit('MUT_END_LOADING', { root: true });
                context.commit('MUT_NOTIFICATION', data, { root: true });
                if(data.success) {
                    router.push({name: 'pages'});
                }
            })
            .catch(exception => {
                console.log(exception);
            });
        context.commit('MUT_PAGE_LOADING_END', { root: true });
    },
};

const customMutations = {
    MUT_ALL_PAGE_DATA: function (state, payload) {
        state.pages = payload.data;
    },
    MUT_SINGLE_PAGE: function (state, payload) {
        state.page = payload.data;
    },
    MUT_PAGE_DEPENDENCY: function (state, payload) {
        state.dependency = payload.data;
    },
};

export default {
    state,
    getters: customGetters,
    mutations: customMutations,
    actions: customActions
}