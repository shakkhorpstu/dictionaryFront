<template>
  <v-layout row class="px-2">
    <v-row>
      <v-col sm="3">
        <v-card
          to="/chapters"
          img="https://ak1.picdn.net/shutterstock/videos/27100651/thumb/1.jpg"
          max-width="344"
          class="mx-auto"
        >
          <v-list-item>
            <v-list-item-avatar style="border: 1px solid #ddd">
              <v-btn icon>
                <v-icon>note</v-icon>
              </v-btn>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-subtitle class="subtitle-1">Total Chapters</v-list-item-subtitle>
              <v-list-item-title class="primary--text">{{ dashboardData['chapters'] }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn small text color="primary accent-4">View all</v-btn>
            <div class="flex-grow-1"></div>
            <v-btn small icon color="primary accent-4">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col sm="3">
        <v-card
          to="/words"
          img="https://ak1.picdn.net/shutterstock/videos/27100651/thumb/1.jpg"
          max-width="344"
          class="mx-auto"
        >
          <v-list-item>
            <v-list-item-avatar style="border: 1px solid #ddd">
              <v-btn icon>
                <v-icon>web_asset</v-icon>
              </v-btn>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-subtitle class="subtitle-1">Total Words</v-list-item-subtitle>
              <v-list-item-title class="primary--text">{{ dashboardData['words'] }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn small text color="primary accent-4">View all</v-btn>
            <div class="flex-grow-1"></div>
            <v-btn small icon color="primary accent-4">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col sm="3">
        <v-card
          to="/sentences"
          img="https://ak1.picdn.net/shutterstock/videos/27100651/thumb/1.jpg"
          max-width="344"
          class="mx-auto"
        >
          <v-list-item>
            <v-list-item-avatar style="border: 1px solid #ddd">
              <v-btn icon>
                <v-icon>subtitles</v-icon>
              </v-btn>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-subtitle class="subtitle-1">Total Sentences</v-list-item-subtitle>
              <v-list-item-title class="primary--text">{{ dashboardData['sentences'] }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn small text color="primary accent-4">View all</v-btn>
            <div class="flex-grow-1"></div>
            <v-btn small icon color="primary accent-4">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col sm="3">
        <v-card
                to="/sentences"
                img="https://ak1.picdn.net/shutterstock/videos/27100651/thumb/1.jpg"
                max-width="344"
                class="mx-auto"
        >
          <v-list-item>
            <v-list-item-avatar style="border: 1px solid #ddd">
              <v-btn icon>
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-subtitle class="subtitle-1">Total Users</v-list-item-subtitle>
              <v-list-item-title class="primary--text">{{ dashboardData['users'] }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn small text color="primary accent-4">View all</v-btn>
            <div class="flex-grow-1"></div>
            <v-btn small icon color="primary accent-4">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import color from "../plugins/colors";
import {mapGetters} from "vuex";

export default {
  name: "Dashboard",
  metaInfo: {
    titleTemplate: "Dashboard | Faton Dictionary"
  },
  data() {
    return {
      color: color
    };
  },
  created() {
    this.$store.dispatch('ACT_DASHBOARD_DATA');
  },
  computed: {
    ...mapGetters({
      dashboardData : 'GET_DASHBOARD_DATA'
    })
  },
};
</script>

<style scoped>
</style>