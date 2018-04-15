<template>
  <v-app>
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
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },

  methods: {
    logout() {
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