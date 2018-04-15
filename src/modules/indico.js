import Vue from 'vue'
import * as firebase from 'firebase'
import * as ff from 'firebase/functions'

export default {
    indicoRequest: null,

    getSentimentFromImg: (img) => {

        return new Promise((resolve, err) => {

            Vue.http.post(
                'https://apiv2.indico.io/fer',
                JSON.stringify({
                  'api_key': "b4585e0f9e78404b5cacc0f83a7ac953",
                  'data': img,
                  'detect': true
                })
              ).then(function(res, err) { 
                if(err)
                    { 
                        err(err);
                        return;  
                    }
                resolve(res.body.results[0].emotions);
              });
        })
    },

    getSentimentFromText: (txt) => {

        return new Promise((resolve, err) => {
            Vue.http.post(
                'https://apiv2.indico.io/sentiment',
                JSON.stringify({
                    'api_key': "b4585e0f9e78404b5cacc0f83a7ac953",
                    'data': txt,
                    'detect': true
                })
              ).then(function(res, err) { 
                if(err)
                    { 
                        err(err);
                        return;  
                    }
                resolve(res.body.results);
              });
        })
    },

    getSentimentFromList: (txt) => {
        // if(!this.indicoRequest)
        //     this.indicoRequest = firebase.functions().httpsCallable('indicoRequest');

        // this.indicoRequest({ url: 'sentiment/batch', data: txt }).then(function(result) {
            
        //     console.log("RRR", result);
        // }).catch(e => console.log("EEE", e));

        return new Promise((resolve, err) => {
            Vue.http.post(
                'https://apiv2.indico.io/sentiment/batch',
                JSON.stringify({
                    'api_key': "b4585e0f9e78404b5cacc0f83a7ac953",
                    'data': txt,
                    'detect': true
                })
              ).then(function(res, err) { 
                if(err)
                    { 
                        err(err);
                        return;  
                    }
                resolve(res.body.results);
              });
        })
    }
}
