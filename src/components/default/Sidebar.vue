<template>
  <div>
    <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent app>
      <v-list-item style="height: 64px" :to="`/`">
        <v-list-item-avatar color="white">
          <v-img :src="require('../../assets/K.png')" height="34" contain />
        </v-list-item-avatar>
        <v-list-item-title class="title">Faton Dictionary</v-list-item-title>
      </v-list-item>
      <v-divider />
      <v-list dense style="padding: 0;">
        <template>
          <v-list-item
            :to="menu.admin_menu.url"
            class="mt-1"
            v-for="(menu, index) in menuItems"
            :key="index"
          >
            <v-list-item-title>
              <v-icon left>{{ menu.admin_menu.icon }}</v-icon>
              {{ menu.admin_menu.name }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item to="/change-password" class="mt-1">
            <v-list-item-title>
              <v-icon left>settings</v-icon>
              Change Password
            </v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
      <template v-slot:append>
        <v-divider></v-divider>
        <div class="pa-2">
          <v-btn @click="$store.dispatch('ACT_LOGOUT')" text small block color="error">Logout
            <v-icon right small>mdi-logout</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app :color="color.header" dark>
      <v-app-bar-nav-icon :color="color.black" @click.stop="collapseSidebar">
        <v-icon>more_vert</v-icon>
      </v-app-bar-nav-icon>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import color from "../../plugins/colors";

export default {
  name: "Sidebar",
  data: () => ({
    drawer: true,
    mini: false,
    color: color,
    expandIntro: false,
    menuItems: []
  }),
  methods: {
    logout() {
      this.$store.dispatch("ACT_LOGOUT");
    },
    collapseSidebar() {
      this.mini = this.drawer;
      this.drawer = !this.drawer;
    },
    expandIntroMenu() {
      this.expandIntro = !this.expandIntro;
    }
  },
  mounted() {
    let menus = localStorage.getItem("menus");
    menus = JSON.parse(menus);
    this.menuItems = menus;
  }
};
</script>

<style scoped>
</style>