import axios from 'axios';
import router from '../router'

const state = {
    blogs: [],
    blog: {},
};

const customGetters = {
    GET_ALL_BLOG_DATA: function(state) {
        return state.blogs;
    },
    GET_SINGLE_BLOG: function(state) {
        return state.blog;
    }
};

const customActions = {
    ACT_ALL_BLOGS: async function (context, payload) {
        context.commit('MUT_PAGE_LOADING_START', { root: true });
        await axios.get(`blogs?page=${payload.next_page}`)
            .then(response => {
                let data = response.data.data;
                context.commit('MUT_ALL_BLOG_DATA', data);
                context.commit('MUT_PAGINATION', data, { root: true });
                context.commit('MUT_PAGE_LOADING_END', { root: true });
            })
            .catch(exception => {
                context.commit('MUT_PAGE_LOADING_END', { root: true });
                console.log(exception);
            });
        context.commit('MUT_PAGE_LOADING_END', { root: true });
    },
    ACT_SEARCH_BLOGS: async function (context, payload) {
        await axios.get(`blogs?page=${payload.next_page}&searchKeyword=${payload.searchKeyword}`)
            .then(response => {
                let data = response.data.data;
                console.log(data);
                context.commit('MUT_ALL_BLOG_DATA', data);
                context.commit('MUT_PAGINATION', data, { root: true });
            })
            .catch(exception => {
                console.log(exception);
            });
    },
    ACT_DELETE_BLOG: async function (context, id) {
        await axios.delete(`blogs/delete/${id}`)
            .then(response => {
                context.commit('MUT_DELETE_POPUP_CLOSE', { root: true });
                context.dispatch('ACT_ALL_BLOGS', {
                    current_page: 1,
                    next_page: 1
                });
            })
            .catch(exception => {
                console.log(exception);
            });
    },
    ACT_STORE_BLOG: async function (context, payload) {
        await axios.post(`blogs/store`, payload)
            .then(response => {
                let data = response.data;
                context.commit('MUT_END_LOADING', { root: true });
                context.commit('MUT_NOTIFICATION', data, { root: true });
                if(data.success) {
                    router.push({name: 'blogs'});
                }
            })
            .catch(exception => {
                console.log(exception);
            });
        context.commit('MUT_PAGE_LOADING_END', { root: true });
    },
    ACT_SINGLE_BLOG: async function (context, id) {
        await axios.get(`blogs/${id}`)
            .then(response => {
                let data = response.data;
                context.commit('MUT_SINGLE_BLOG', data);
            })
            .catch(exception => {
                console.log(exception);
            });
    },
    ACT_UPDATE_BLOG: async function (context, payload) {
        await axios.post(`blogs/update`, payload)
            .then(response => {
                let data = response.data;
                context.commit('MUT_END_LOADING', { root: true });
                context.commit('MUT_NOTIFICATION', data, { root: true });
                if(data.success) {
                    router.push({name: 'blogs'});
                }
            })
            .catch(exception => {
                console.log(exception);
            });
        context.commit('MUT_PAGE_LOADING_END', { root: true });
    },
};

const customMutations = {
    MUT_ALL_BLOG_DATA: function (state, payload) {
        state.blogs = payload.data;
    },
    MUT_SINGLE_BLOG: function (state, payload) {
        state.blog = payload.data;
    }
};

export default {
    state,
    getters: customGetters,
    mutations: customMutations,
    actions: customActions
}