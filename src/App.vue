<template>
  <div>
    <v-app id="inspire" v-if="loggedUser">
      <Sidebar></Sidebar>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>

    <v-content v-else>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </div>
</template>

<script>
  import Sidebar from './components/default/Sidebar';
  import { mapGetters } from 'vuex';
  import color from './plugins/colors';

  export default {
    name: 'App',
    components: {
      Sidebar
    },
    data: () => ({
      loggedUser: localStorage.getItem('user'),
      color: color
    }),
    methods: {

    },
    mounted() {

    },
    computed: {
      // ...mapGetters({
      //   language : 'GET_ACTIVE_LANGUAGE_TEXT'
      // })
    },
  };
</script>
