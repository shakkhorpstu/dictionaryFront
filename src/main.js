import Vue from 'vue';
import App from './App.vue';
import VueMeta from 'vue-meta';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueAxios, axios);
Vue.use(VueMeta);
Vue.use(require('vue-moment'));
Vue.use(ElementUI);
Vue.config.productionTip = false;

import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

// axios.defaults.baseURL = 'http://faton-dictionary-api.devsenv.com/public/api/';
axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem('token'));

new Vue({
    render: h => h(App),
    router,
    vuetify,
    store
}).$mount('#app');