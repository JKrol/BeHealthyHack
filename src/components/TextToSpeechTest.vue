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
        textToSpeech.getAudioContent(this.text).then(data => {
            // console.log(data);
            var snd = new Audio("data:audio/wav;base64," + data);
            snd.play();
      }).catch(err => {console.log(err);});
    }
  }
}
</script>

<style scoped>

</style>
