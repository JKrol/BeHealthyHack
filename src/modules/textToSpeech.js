import Vue from 'vue'
export default {


    getAudioContent: (txt) => {

        return new Promise((resolve, err) => {
            Vue.http.post(
                'https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=AIzaSyAU9oQBX3J1B0t4OLL5yLTGr4k6_FLbjTU',
                JSON.stringify({
                    "input": {
                        "text": txt,
                    },
                        "voice": {
                        "languageCode": "en-US",
                        "name": "en-US-Wavenet-F"
                    },
                        "audioConfig": {
                        "audioEncoding": "MP3",
                        "pitch": 1.00,
                        "speakingRate": 1.00
                    }
                })
              ).then(function(res, err) { 
                if(err)
                    { 
                        err(err);
                        return;  
                    }
                resolve(res.body.audioContent);
              });
        })
    }
}
