<template>
  <v-container fluid>
    <input v-model="text" placeholder="Text">
    <v-btn @click="read()">Analyze</v-btn>
    <br>
    Location: {{location}}
  </v-container>
</template>

<script>
import analyzeEntities from "../modules/analyzeEntities"

export default {
    data() {
        return {
            text: '',
            location: '',
        }
    },
    methods: {
        read: function () {
        analyzeEntities.getLocation(this.text).then(data => {
          this.location = data;
      }).catch(err => {console.log(err);});
    }
  }
}
</script>

<style scoped>

</style>
