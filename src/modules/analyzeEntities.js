import Vue from 'vue'
import { ETXTBSY } from 'constants';
export default {


    getLocation: (txt) => {

        return new Promise((resolve, err) => {
            Vue.http.post(
                'https://language.googleapis.com/v1/documents:analyzeEntities?key=AIzaSyAU9oQBX3J1B0t4OLL5yLTGr4k6_FLbjTU',
                JSON.stringify({
                    "document": {
                        "type": "PLAIN_TEXT",
                        "content": txt,
                        "language": "en"
                       },
                       "encodingType": "UTF8"
                })
              ).then(function(res, err) { 
                if(err)
                    { 
                        err(err);
                        return;  
                    }


                var result = res.body.entities.filter(entity => entity.type === "LOCATION").sort((a, b) => a.salience < b.salience)

                if(result === undefined || result.length <= 0)
                {
                    resolve(null);
                    return;
                }

                resolve(result[0].name);
              });
        })
    }
}
