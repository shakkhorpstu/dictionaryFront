import axios from 'axios';
import router from '../router'

const state = {
    chapters: [],
    chapter: {},
    dependency: []
};

const customGetters = {
    GET_ALL_CHAPTER_DATA: function(state) {
        return state.chapters;
    },
    GET_CHAPTER_DEPENDENCY: function(state) {
        if(state.dependency['chapters']) {
            return state.dependency['chapters'].map(chapter => {
                return {
                    'value': chapter.id,
                    'text': chapter.name
                };
            });
        }
    },
    GET_CHAPTER_LANGUAGE_DEPENDENCY: function(state) {
        if(state.dependency['languages']) {
            return state.dependency['languages'].map(language => {
                return {
                    'value': language.id,
                    'text': language.name
                };
            });
        }
    },
    GET_SINGLE_CHAPTER: function(state) {
        return state.chapter;
    }
};

const customActions = {
    ACT_ALL_CHAPTERS: async function (context, payload) {
        context.commit('MUT_PAGE_LOADING_START', { root: true });
        await axios.get(`chapters?page=${payload.next_page}`)
            .then(response => {
                let data = response.data.data;
                context.commit('MUT_ALL_CHAPTER_DATA', data);
                context.commit('MUT_PAGINATION', data, { root: true });
                context.commit('MUT_PAGE_LOADING_END', { root: true });
            })
            .catch(exception => {
                context.commit('MUT_PAGE_LOADING_END', { root: true });
                console.log(exception);
            });
        context.commit('MUT_PAGE_LOADING_END', { root: true });
    },
    ACT_SEARCH_CHAPTERS: async function (context, payload) {
        await axios.get(`chapters?page=${payload.next_page}&searchKeyword=${payload.searchKeyword}`)
            .then(response => {
                let data = response.data.data;
                context.commit('MUT_ALL_CHAPTER_DATA', data);
                context.commit('MUT_PAGINATION', data, { root: true });
            })
            .catch(exception => {
                console.log(exception);
            });
    },
    ACT_DELETE_CHAPTER: async function (context, id) {
        await axios.delete(`chapters/delete/${id}`)
            .then(response => {
                context.commit('MUT_DELETE_POPUP_CLOSE', { root: true });
                context.dispatch('ACT_ALL_CHAPTERS', {
                    current_page: 1,
                    next_page: 1
                });
            })
            .catch(exception => {
                console.log(exception);
            });
    },
    ACT_DEPENDENCY_CHAPTER: async function (context) {
        await axios.get(`chapters/dependency/data`)
            .then(response => {
                let data = response.data;
                context.commit('MUT_CHAPTER_DEPENDENCY', data);
            })
            .catch(exception => {
                console.log(exception);
            });
    },
    ACT_STORE_CHAPTER: async function (context, payload) {
        await axios.post(`chapters/store`, payload)
            .then(response => {
                let data = response.data;
                context.commit('MUT_END_LOADING', { root: true });
                context.commit('MUT_NOTIFICATION', data, { root: true });
                if(data.success) {
                    router.push({name: 'chapters'});
                }
            })
            .catch(exception => {
                console.log(exception);
            });
        context.commit('MUT_PAGE_LOADING_END', { root: true });
    },
    ACT_SINGLE_CHAPTER: async function (context, id) {
        await axios.get(`chapters/${id}`)
            .then(response => {
                let data = response.data;
                context.commit('MUT_SINGLE_CHAPTER', data);
            })
            .catch(exception => {
                console.log(exception);
            });
    },
    ACT_UPDATE_CHAPTER: async function (context, payload) {
        await axios.post(`chapters/update`, payload.singleChapter)
            .then(response => {
                let data = response.data;
                if(data.success) {
                    if(payload.hasImage) {
                        axios.post(`chapters/update/image/${payload.singleChapter.id}`, payload.image)
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
                    router.push({name: 'chapters'});
                }
            })
            .catch(exception => {
                console.log(exception);
            });
        context.commit('MUT_PAGE_LOADING_END', { root: true });
    },
};

const customMutations = {
    MUT_ALL_CHAPTER_DATA: function (state, payload) {
        state.chapters = payload.data;
    },
    MUT_CHAPTER_DEPENDENCY: function (state, payload) {
        state.dependency = payload.data;
    },
    MUT_SINGLE_CHAPTER: function (state, payload) {
        state.chapter = payload.data;
    }
};

export default {
    state,
    getters: customGetters,
    mutations: customMutations,
    actions: customActions
}