<template>
  <div>
    <br/><br/><br/>
    BOT
    <ul>
      <li v-for="item in history" :key="item.id">
        {{ item.type }}
        {{ item.text }}
      </li>
    </ul>

    <v-btn @click="startRecording()">Start</v-btn>
    <v-btn @click="stopRecording()">Stop</v-btn>
  </div>
</template>


<script>

export default {
  created() {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
      window.URL = window.URL || window.webkitURL;
  
      this.audioContext = new AudioContext;
      console.log('Audio context set up.');
      console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
    } catch (e) {
      console.log(e);
      alert('No web audio support in this browser!');
    }
      
    const that = this;
    navigator.getUserMedia({
      audio: true
    }, function(stream) {
      that.startUserMedia(stream)
    }, function(e) {
      console.log('No live audio input: ' + e);
    });
  },

  destroyed() {
    this.audioContext.close();
  },

  data () {
    return {
      audioContext: null,
      recorder: null,
      data: {
        "audio": {
          "content": null
        },
        "config": {
          "encoding": "LINEAR16",
          "sampleRateHertz": 48000,
          "languageCode": null
        }
      }
    };
  },

  methods: {
    startUserMedia(stream) {
      const input = this.audioContext.createMediaStreamSource(stream);
      this.recorder = new Recorder(input);
    },
    startRecording() {
      this.recorder && this.recorder.record();
    },
    stopRecording() {
      this.recorder && this.recorder.stop();
      // create WAV download link using audio data blob
      this.processRecording();
      this.recorder.clear();
    },
    processRecording() {
      var that = this;
      this.recorder && this.recorder.exportWAV(function(blob) {
        var reader = new window.FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const baseData = reader.result;
          const base64Data = baseData.replace("data:audio/wav;base64,", "");
          that.data.audio.content = base64Data;
          that.data.config.languageCode = 'en-US';
          that.$http.post(`https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyAU9oQBX3J1B0t4OLL5yLTGr4k6_FLbjTU`,
              that.data).then(response => {

                const result = response.data.results ? response.data.results[0].alternatives[0] : null;

                if (result && result.transcript && result.transcript.length > 0) {
                  that.$store.dispatch("addToHistory", {
                    type: "USER",
                    text: result.transcript
                  });
                }
            }).catch(error => {
              console.log("ERROR:" + error);
            })
        }
      });
    }
  },

  computed: {
    history() {
      return this.$store.getters.getHistory;
    }
  }
};
</script>


<style scoped>

</style>
