import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import auth from "./auth";
import chapter from "./chapter";
import sentence from "./sentence";
import word from "./word";
import language from "./language";
import admin from "./admin";
import country from "./country";
import user from "./user";
import role from "./role";
import dashboard from "./dashboard";
import page from './page.js';
import blog from './blog.js';
import password from './password.js';

const store = new Vuex.Store({
    modules: {
        auth, chapter, sentence, word, language, admin, country, user, role, dashboard, page, blog, password
    },
    state: {
        submitLoading: false,
        pageLoading: false,
        pagination: {
            current_page: 1
        },
        snackbar: false,
        notificationMessage: '',
        deleteDialog: false,
        formSubmitSuccess: false,
        detailsDialogVisible: false,
        editDialogVisible: false,
        createDialogVisible: false,
    },
    getters: {

    },
    mutations: {
        MUT_START_LOADING(state) {
            state.submitLoading = true;
        },
        MUT_END_LOADING(state) {
            state.submitLoading = false;
        },
        MUT_PAGE_LOADING_START(state) {
            state.pageLoading = true;
        },
        MUT_PAGE_LOADING_END(state) {
            state.pageLoading = false;
        },
        MUT_PAGINATION(state, payload) {
            let pagination = {
                'current_page': payload.current_page,
                'first_page_url': payload.first_page_url,
                'from': payload.from,
                'last_page': payload.last_page,
                'last_page_url': payload.last_page_url,
                'next_page_url': payload.next_page_url,
                'path': payload.path,
                'per_page': payload.per_page,
                'prev_page_url': payload.prev_page_url,
                'to': payload.to,
                'total': payload.total,
                'total_item': Math.ceil(payload.total / payload.per_page),
            };
            state.pagination = pagination;
        },
        MUT_NOTIFICATION(state, payload) {
            state.snackbar = true;
            state.notificationMessage = payload.message;
        },
        MUT_DELETE_POPUP_OPEN(state) {
            state.deleteDialog = true;
        },
        MUT_DELETE_POPUP_CLOSE(state) {
            state.deleteDialog = false;
        },
        MUT_ALL_DIALOG_CLOSE(state) {
            state.createDialogVisible = false;
            state.editDialogVisible = false;
        }
    }
});

export default store