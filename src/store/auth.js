import axios from 'axios';
import router from '../router';

const state = {
    menus: [],
    role: {},
    admin: {}
};

const customGetters = {

};

const customActions = {
    ACT_LOGIN: async function (context, payload) {
        await axios.post('login', payload)
                .then(response => {
                    let data = response.data;
                    context.commit('MUT_LOGGED_USER_DATA', data);
                    context.commit('MUT_END_LOADING', { root: true });
                    window.location.href = '/';
                })
                .catch(exception => {
                    console.log(exception);
                    let errorData = {
                        message: 'Invalid email / password'
                    };
                    context.commit('MUT_END_LOADING', { root: true });
                    context.commit('MUT_NOTIFICATION', errorData, { root: true });
                });
    },
    ACT_LOGOUT: function (context) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('menus');
        location.href = '/login';
    }
};

const customMutations = {
    MUT_LOGGED_USER_DATA: function (state, payload) {
        // state.admin = payload.user.admin;
        // state.role = payload.user.admin.admin_role;
        state.menus = payload.user.admin.admin_role.admin_permission;

        delete payload.user.admin;
        localStorage.setItem('user', JSON.stringify(payload.user));
        localStorage.setItem('token', JSON.stringify(payload.token));
        localStorage.setItem('menus', JSON.stringify(state.menus));
    },
};

export default {
    state,
    getters: customGetters,
    mutations: customMutations,
    actions: customActions
}