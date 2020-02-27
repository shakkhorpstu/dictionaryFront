import axios from 'axios';

const state = {
    dashboardData: [],
};

const customGetters = {
    GET_DASHBOARD_DATA: function(state) {
        return state.dashboardData;
    }
};

const customActions = {
    ACT_DASHBOARD_DATA: async function (context) {
        await axios.get('dashboard')
            .then(response => {
                let data = response.data;
                context.commit('MUT_DASHBOARD_DATA', data);
            })
            .catch(exception => {
                console.log(exception);
            });
    }
};

const customMutations = {
    MUT_DASHBOARD_DATA: function (state, payload) {
        state.dashboardData = payload.data;
    },
};

export default {
    state,
    getters: customGetters,
    mutations: customMutations,
    actions: customActions
}