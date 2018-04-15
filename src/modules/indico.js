import Vue from 'vue'
export default {


    getSentimentFromImg: (img) => {

        return new Promise((resolve, err) => {
            Vue.http.post(
                'https://cors-anywhere.herokuapp.com/https://apiv2.indico.io/fer',
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
                'https://cors-anywhere.herokuapp.com/https://apiv2.indico.io/sentiment',
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

        return new Promise((resolve, err) => {
            Vue.http.post(
                'https://cors-anywhere.herokuapp.com/https://apiv2.indico.io/sentiment/batch',
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
