import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

const MY_ICONS = {
    test: require('../assets/test.svg'),
};

export default new Vuetify({
    icons: {
        values: MY_ICONS,
    },
});
