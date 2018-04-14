<template>
  <v-app>
    <v-toolbar app v-if="isLoggedIn">
      <img :src="profile.picture" />
      {{ profile.name }}
      <v-spacer></v-spacer>
      <a v-if="isLoggedIn" @click="logout()">Logout</a>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import store from '@/store'

export default {
  data () {
    return {
      title: 'Vuetify.js'
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    profile() {
      return this.$store.getters.userInfo;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  },
  name: 'App'
}
</script>
