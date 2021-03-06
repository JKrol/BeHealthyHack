<template>
  <section class="view bot">
    <div>
      <div v-for="item in history" :key="item.id">
        <MessageBubble
          v-if="item.type === 'BOT'"
          :message="item.text"
          theme="t-white"
          direction="in" />
        <MessageBubble
          v-else
          :message="item.text"
          theme="t-green"
          direction="out" />
      </div>
    </div>

    <div class="buttons">
      <v-btn @click="startRecording()" :disabled="recording || processing">Start</v-btn>
      <v-btn @click="stopRecording()" :disabled="!recording || processing">Stop</v-btn>
    </div>
  </section>
</template>


<script>
import textToSpeech from "@/modules/textToSpeech";

import MessageBubble from "../components/MessageBubble";
import SolidButton from "../components/SolidButton";

export default {
  components: {
    MessageBubble,
    SolidButton
  },
  created() {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      navigator.getUserMedia =
        navigator.getUserMedia || navigator.webkitGetUserMedia;
      window.URL = window.URL || window.webkitURL;

      this.audioContext = new AudioContext();
      console.log("Audio context set up.");
      console.log(
        "navigator.getUserMedia " +
          (navigator.getUserMedia ? "available." : "not present!")
      );
    } catch (e) {
      console.log(e);
      alert("No web audio support in this browser!");
    }

    const that = this;
    navigator.getUserMedia(
      {
        audio: true
      },
      function(stream) {
        that.startUserMedia(stream);
      },
      function(e) {
        console.log("No live audio input: " + e);
      }
    );

    if(this.language === 'en-US')
      this.respond("Hey, Whats up, want to write your daily diary now?");
    else
      this.respond("Czesc, co tam, chcesz moze napisac teraz pamietnik?");
  },

  destroyed() {
    this.audioContext.close();
  },

  data() {
    return {
      step: 1,
      audioContext: null,
      recorder: null,
      recording: false,
      processing: false,
      language: "en-US",
      // language: 'pl-PL',
      data: {
        audio: {
          content: null
        },
        config: {
          encoding: "LINEAR16",
          sampleRateHertz: 48000,
          languageCode: null
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
      this.recording = true;
      this.processing = false;
      this.recorder && this.recorder.record();
    },
    stopRecording() {
      this.recording = false;
      this.processing = true;
      this.recorder && this.recorder.stop();
      // create WAV download link using audio data blob
      this.processRecording();
      this.recorder.clear();
    },
    processRecording() {
      var that = this;
      this.recorder &&
        this.recorder.exportWAV(function(blob) {
          var reader = new window.FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const baseData = reader.result;
            const base64Data = baseData.replace("data:audio/wav;base64,", "");
            that.data.audio.content = base64Data;
            that.data.config.languageCode = that.language;
            that.$http
              .post(
                `https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyAU9oQBX3J1B0t4OLL5yLTGr4k6_FLbjTU`,
                that.data
              )
              .then(response => {
                const result = response.data.results
                  ? response.data.results[0].alternatives[0]
                  : null;

                if (
                  result &&
                  result.transcript &&
                  result.transcript.length > 0
                ) {
                  that.$store.dispatch("addToHistory", {
                    type: "USER",
                    text: result.transcript
                  });

                  that.onAction(result.transcript);
                }

                that.processing = false;
              })
              .catch(error => {
                that.processing = false;
                console.log("ERROR:" + error);
              });
          };
        });
    },
    onAction(text) {
      if(this.language === 'en-US') {
        switch(this.step) {
          case 0:
            this.respond('Hey, Whats up, want to write your daily diary now?');
            this.step = 1;
          break;
          case 1:
            if(text.toLowerCase().includes('yes')) {
              this.respond('So, how do you feel after your day?');
              this.step = 2;
            } else {
              this.respond('Ok!');
              this.step = 0;
            }
          break;
          case 2:
            this.respond('What was your biggest accomplishment today?');
            this.step = 3;
          break;
          case 3:
            this.respond('What was the most challenging task for you?');
            this.step = 4;
          break;
          case 4:
            this.respond(`Would you say, you had a good day, ${this.$store.getters.userInfo.name.split(' ')[0]}?`);
            this.step = 5;
          break;
          case 5:
            if(text.toLowerCase().includes('yes')) {
              this.respond('That is awesome! See you tomorrow!');
            } else {
              this.respond('What a pity! See you tomorrow!');
            }     
          break;
        }
      }
      else 
      {
          switch(this.step) {
          case 0:
            this.respond('Czesc, co tam, chcesz moze napisac teraz pamietnik?');
            this.step = 1;
          break;
          case 1:
            if(text.toLowerCase().includes('tak')) {
              this.respond('Wiec jak sie czujesz po calym dniu?');
              this.step = 2;
            } else {
              this.respond('Ok!');
              this.step = 0;
            }
          break;
          case 2:
            this.respond('Jakie bylo Twoje najwieksze dzisiejsze osiagniecie?');
            this.step = 3;
          break;
          case 3:
            this.respond('Co bylo najbardziej wymagajacym zadaniem dla Ciebie?');
            this.step = 4;
          break;
          case 4:
            this.respond(`Czy mozesz powiedziec, ze miales dobry dzien ${this.$store.getters.userInfo.name.split(' ')[0]}?`);
            this.step = 5;
          break;
          case 5:
            if(text.toLowerCase().includes('tak')) {
              this.respond('To super! Na dzisiaj to wszystko, dobrego dnia!');
            } else {
              this.respond('Szkoda, ale nie zalamuj sie! Na dzisiaj to wszystko, dobrego dnia!');
            }            
            this.step = 6;
          break;
        }
      }
    },
    respond(text) {
      if (this.language == "pl-PL") {
        responsiveVoice.speak(text, "Polish Female");
        this.saveBotResponse(text);
      } else {
        textToSpeech
          .getAudioContent(text)
          .then(data => {
            var snd = new Audio("data:audio/wav;base64," + data);
            snd.play();

            this.saveBotResponse(text);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    saveBotResponse(text) {
      this.$store.dispatch("addToHistory", {
        type: "BOT",
        text: text
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


<style lang="scss" scoped>
.bot {
  padding-top: 34px;

  .message-bubble {
    margin-bottom: 16px;
  }

  .buttons {
    width: 100%;
    display: flex;
    position: fixed;
    bottom: 32px;
    left: 0;
    padding: 0 14px;
  }
}
</style>
