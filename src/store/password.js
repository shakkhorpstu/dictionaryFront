import axios from 'axios';
import router from '../router';

const customActions = {
    ACT_CHANGE_PASSWORD: async function (context, payload) {
        await axios.post('change-password', payload)
            .then(response => {
                let data = response.data;
                context.commit('MUT_END_LOADING', { root: true });
                context.commit('MUT_NOTIFICATION', data, { root: true });
            })
            .catch(exception => {
                console.log(exception);
            });
    },
};

export default {
    actions: customActions
}