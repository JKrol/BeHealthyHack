<template>
  <v-app>
    <v-toolbar app v-if="isLoggedIn">
      <img :src="profile.picture" />
      {{ profile.name }}
      <a v-if="isLoggedIn" @click="logout()">Logout</a>
    </v-toolbar>
    <router-view />
  </v-app>
</template>

<script>
import store from "@/store";

export default {
  data() {
    return {
      title: "Vuetify.js"
    };
  },

  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn;
    },
    profile () {
      return this.$store.getters.userInfo;
    }
  },

  methods: {
    logout () {
      this.$store.dispatch("logout");
    }
  },

  name: "App"
};
</script>

<style>
html {
  height: 100%;
}

[id="app"] {
  min-height: 100%;
}

.view {
  padding: 0 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(-153deg, #4267b2 0%, #29487d 95%);
}
</style>