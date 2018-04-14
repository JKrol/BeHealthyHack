<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-btn @click="fbLogout()">Logout</v-btn>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
export default {
  methods: {
    fbLogout: function (event) {
      FB.logout(function(response) {
        console.log(response)
      });
    }
  }
}
</script>

<style scoped>

</style>
