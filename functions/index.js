const functions = require('firebase-functions');

const request = require('request');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.indicoRequest = functions.https.onCall((data, context) => {
    return new Promise((resolve, reject) => {
        console.debug(`URL: https://apiv2.indico.io/${data.url}`);
        
        request.post(
            `https://apiv2.indico.io/${data.url}`,
                JSON.stringify({
                    'api_key': "b4585e0f9e78404b5cacc0f83a7ac953",
                    'data': data.data,
                    'detect': true
                }),
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(body);
                }
                else {
                    reject(error);
                }
            }
        );
    });
});
