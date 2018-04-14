<template>
</template>

<script>
// import smutny from "../assets/smutny.jpg"
// import wesoly from "../assets/wesoly.jpg"
import indico from "../modules/indico"

export default {
  mounted(){
      // indico.getSentimentFromImg(wesoly).then(data => {
      //   console.log("wesoly");
      //   console.log(data);
      // }).catch(err => {console.log(err);});

      // indico.getSentimentFromImg(smutny).then(data => {
      //   console.log("smutny");
      //   console.log(data);
      // }).catch(err => {console.log(err);});
      

      ["Hi, i'm fap and i like to masturbate!",
      "I hate my work.",
      "Why do I dont have any friends.",
      "Im wondering if tomorrow will be nice weather.",
      "I am very sleepy after this whole day of work",
      "I am so fucked up. Please message me."].forEach(function(txt){
      indico.getSentimentFromText(txt).then(data => {
        console.log(txt);
        console.log(data);
      }).catch(err => {console.log(err);});
      });
  },
}
</script>

<style scoped>

</style>
