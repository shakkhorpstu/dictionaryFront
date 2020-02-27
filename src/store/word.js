import axios from 'axios';
import router from '../router'

const state = {
    words: [],
    word: {},
    dependency: []
};

const customGetters = {
    GET_ALL_WORD_DATA: function(state) {
        return state.words;
    },
    GET_WORD_DEPENDENCY: function(state) {
        if(state.dependency['chapters']) {
            return state.dependency['chapters'].map(chapter => {
                return {
                    'value': chapter.id,
                    'text': chapter.name
                };
            });
        }
    },
    GET_WORD_LANGUAGE_DEPENDENCY: function(state) {
        if(state.dependency['languages']) {
            return state.dependency['languages'].map(language => {
                return {
                    'value': language.id,
                    'text': language.name
                };
            });
        }
    },
    GET_SINGLE_WORD: function(state) {
        return state.word;
    }
};

const customActions = {
    ACT_ALL_WORDS: async function (context, payload) {
        context.commit('MUT_PAGE_LOADING_START', { root: true });
        await axios.get(`words?page=${payload.next_page}`)
            .then(response => {
                let data = response.data.data;
                context.commit('MUT_ALL_WORD_DATA', data);
                context.commit('MUT_PAGINATION', data, { root: true });
                context.commit('MUT_PAGE_LOADING_END', { root: true });
            })
            .catch(exception => {
                context.commit('MUT_PAGE_LOADING_END', { root: true });
                console.log(exception);
            });
        context.commit('MUT_PAGE_LOADING_END', { root: true });
    },
    ACT_SEARCH_WORDS: async function (context, payload) {
        await axios.get(`words?page=${payload.next_page}&searchKeyword=${payload.searchKeyword}`)
            .then(response => {
                let data = response.data.data;
                console.log(data);
                context.commit('MUT_ALL_WORD_DATA', data);
                context.commit('MUT_PAGINATION', data, { root: true });
            })
            .catch(exception => {
                console.log(exception);
            });
    },
    ACT_DELETE_WORD: async function (context, id) {
        await axios.delete(`words/delete/${id}`)
            .then(response => {
                context.commit('MUT_DELETE_POPUP_CLOSE', { root: true });
                context.dispatch('ACT_ALL_WORDS', {
                    current_page: 1,
                    next_page: 1
                });
            })
            .catch(exception => {
                console.log(exception);
            });
    },
    ACT_DEPENDENCY_WORD: async function (context) {
        await axios.get(`words/dependency/data`)
            .then(response => {
                let data = response.data;
                context.commit('MUT_WORD_DEPENDENCY', data);
            })
            .catch(exception => {
                console.log(exception);
            });
    },
    ACT_STORE_WORD: async function (context, payload) {
        await axios.post(`words/store`, payload)
            .then(response => {
                let data = response.data;
                context.commit('MUT_END_LOADING', { root: true });
                context.commit('MUT_NOTIFICATION', data, { root: true });
                if(data.success) {
                    router.push({name: 'words'});
                }
            })
            .catch(exception => {
                console.log(exception);
            });
        context.commit('MUT_PAGE_LOADING_END', { root: true });
    },
    ACT_SINGLE_WORD: async function (context, id) {
        await axios.get(`words/${id}`)
            .then(response => {
                let data = response.data;
                context.commit('MUT_SINGLE_WORD', data);
            })
            .catch(exception => {
                console.log(exception);
            });
    },
    ACT_UPDATE_WORD: async function (context, payload) {
        await axios.post(`words/update`, payload)
            .then(response => {
                let data = response.data;
                context.commit('MUT_END_LOADING', { root: true });
                context.commit('MUT_NOTIFICATION', data, { root: true });
                if(data.success) {
                    router.push({name: 'words'});
                }
            })
            .catch(exception => {
                console.log(exception);
            });
        context.commit('MUT_PAGE_LOADING_END', { root: true });
    },
};

const customMutations = {
    MUT_ALL_WORD_DATA: function (state, payload) {
        state.words = payload.data;
    },
    MUT_WORD_DEPENDENCY: function (state, payload) {
        state.dependency = payload.data;
    },
    MUT_SINGLE_WORD: function (state, payload) {
        state.word = payload.data;
    }
};

export default {
    state,
    getters: customGetters,
    mutations: customMutations,
    actions: customActions
}