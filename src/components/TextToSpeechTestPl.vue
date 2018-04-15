<template>
  <v-container fluid>
    <input v-model="text" placeholder="Text">
    <v-btn @click="read()">Read</v-btn>
  </v-container>
</template>

<script>
import textToSpeech from "../modules/textToSpeech"

export default {
    data() {
        return {
            text: ''
        }
    },
    methods: {
        read: function () {
          responsiveVoice.speak(this.text, 'Polish Female'); 
    }
  }
}
</script>

<style scoped>

</style>
