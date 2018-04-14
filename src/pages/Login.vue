<template>
  <div>
    <div v-if="!isLoginPending">
      Logowanie
      <v-btn @click="login()">Zaloguj przez FB</v-btn>
    </div>
    <div v-if="isLoginPending">
      Loading...
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$store.dispatch('login');
    }
  },
  computed: {
    isLoginPending() {
      return this.$store.getters.isLoginPending;
    },
    loginError() {
      return this.$store.getters.loginError;
    }
  },
}
</script>

<style scoped>

</style>
