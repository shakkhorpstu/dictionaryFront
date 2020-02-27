import axios from 'axios';
import router from '../router'

const state = {
    sentences: [],
    sentence: {},
    dependency: []
};

const customGetters = {
    GET_ALL_SENTENCE_DATA: function(state) {
        return state.sentences;
    },
    GET_SENTENCE_DEPENDENCY: function(state) {
        if(state.dependency['chapters']) {
            return state.dependency['chapters'].map(chapter => {
                return {
                    'value': chapter.id,
                    'text': chapter.name
                };
            });
        }
    },
    GET_SENTENCE_LANGUAGE_DEPENDENCY: function(state) {
        if(state.dependency['languages']) {
            return state.dependency['languages'].map(language => {
                return {
                    'value': language.id,
                    'text': language.name
                };
            });
        }
    },
    GET_SINGLE_SENTENCE: function(state) {
        return state.sentence;
    }
};

const customActions = {
    ACT_ALL_SENTENCES: async function (context, payload) {
        context.commit('MUT_PAGE_LOADING_START', { root: true });
        await axios.get(`sentences?page=${payload.next_page}`)
            .then(response => {
                let data = response.data.data;
                context.commit('MUT_ALL_SENTENCE_DATA', data);
                context.commit('MUT_PAGINATION', data, { root: true });
                context.commit('MUT_PAGE_LOADING_END', { root: true });
            })
            .catch(exception => {
                context.commit('MUT_PAGE_LOADING_END', { root: true });
                console.log(exception);
            });
        context.commit('MUT_PAGE_LOADING_END', { root: true });
    },
    ACT_SEARCH_SENTENCES: async function (context, payload) {
        await axios.get(`sentences?page=${payload.next_page}&searchKeyword=${payload.searchKeyword}`)
            .then(response => {
                let data = response.data.data;
                context.commit('MUT_ALL_SENTENCE_DATA', data);
                context.commit('MUT_PAGINATION', data, { root: true });
            })
            .catch(exception => {
                console.log(exception);
            });
    },
    ACT_DELETE_SENTENCE: async function (context, id) {
        await axios.delete(`sentences/delete/${id}`)
            .then(response => {
                context.commit('MUT_DELETE_POPUP_CLOSE', { root: true });
                context.dispatch('ACT_ALL_SENTENCES', {
                    current_page: 1,
                    next_page: 1
                });
            })
            .catch(exception => {
                console.log(exception);
            });
    },
    ACT_DEPENDENCY_SENTENCE: async function (context) {
        await axios.get(`sentences/dependency/data`)
            .then(response => {
                let data = response.data;
                context.commit('MUT_SENTENCE_DEPENDENCY', data);
            })
            .catch(exception => {
                console.log(exception);
            });
    },
    ACT_STORE_SENTENCE: async function (context, payload) {
        await axios.post(`sentences/store`, payload)
            .then(response => {
                let data = response.data;
                context.commit('MUT_END_LOADING', { root: true });
                context.commit('MUT_NOTIFICATION', data, { root: true });
                if(data.success) {
                    router.push({name: 'sentences'});
                }
            })
            .catch(exception => {
                console.log(exception);
            });
        context.commit('MUT_PAGE_LOADING_END', { root: true });
    },
    ACT_SINGLE_SENTENCE: async function (context, id) {
        await axios.get(`sentences/${id}`)
            .then(response => {
                let data = response.data;
                context.commit('MUT_SINGLE_SENTENCE', data);
            })
            .catch(exception => {
                console.log(exception);
            });
    },
    ACT_UPDATE_SENTENCE: async function (context, payload) {
        await axios.post(`sentences/update`, payload)
            .then(response => {
                let data = response.data;
                context.commit('MUT_END_LOADING', { root: true });
                context.commit('MUT_NOTIFICATION', data, { root: true });
                if(data.success) {
                    router.push({name: 'sentences'});
                }
            })
            .catch(exception => {
                console.log(exception);
            });
        context.commit('MUT_PAGE_LOADING_END', { root: true });
    },
};

const customMutations = {
    MUT_ALL_SENTENCE_DATA: function (state, payload) {
        state.sentences = payload.data;
    },
    MUT_SENTENCE_DEPENDENCY: function (state, payload) {
        state.dependency = payload.data;
    },
    MUT_SINGLE_SENTENCE: function (state, payload) {
        state.sentence = payload.data;
    }
};

export default {
    state,
    getters: customGetters,
    mutations: customMutations,
    actions: customActions
}