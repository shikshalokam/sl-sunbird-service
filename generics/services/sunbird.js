/**
 * name : sunbird.js
 * author : Rakesh Kumar
 * Date : 18-march-2020
 * Description : All sunbird service related information.
 */

//dependencies

const request = require('request');


/**
  * Call to sunbird api's. 
  * @function
  * @name callToSunbird
  * @param requestBody - Logged in user Id.
  * @param token - Logged in user token.
  * @param url - url of the api call.
  * @param requestType - http request method
  * @returns {JSON} - consist of sunbird service response
*/

function callToSunbird(requestType,url,token,requestBody ="") {

    return new Promise(async (resolve, reject) => {
        let options = {
            "headers": {
                "content-type": "application/json",
                "authorization": process.env.AUTHORIZATION,
                "x-authenticated-user-token": token
            }
        };

        if (requestType != "GET") {
            options['json'] = { request: requestBody };
        }

        url =process.env.sunbird_url + url;
        if (requestType == "PATCH") {
            request.patch(url, options, callback);
        } else if (requestType == "GET") {
            request.get(url, options, callback);
        } else {
            request.post(url, options, callback);
        }

        function callback(err, data) {
            if (err) {
                return reject({
                    message: constants.apiResponses.SUNBIRD_SERVICE_DOWN
                });
            } else {

                if(data.statusCode == httpStatusCode.ok.status){
                    if(data.body && data.body.responseCode  && data.body.responseCode == constants.common.RESPONSE_OK ){
                        if(data.body.result){
                           return resolve(data.body.result);
                        }
                    }
                }
                return reject({ result:data.body });
            }
        }

    });
}


/**
  * Get learning resources.
  * @function
  * @name learningResources
  * @param token - Logged in user token.
  * @returns {JSON} - consist of learning resources list
*/

const learningResources = function (token) {
    return new Promise(async (resolve, reject) => {

        const learningResourceUrl = constants.apiEndpoints.GET_RESOURCES;
        let requestBody = {
            "source": "web",
            "name": "Resource",
            "filters": {
              "objectType": [
                "Content"
              ]
            }
          }
        let response = await callToSunbird("POST",learningResourceUrl,token,requestBody);
        return resolve(response);
        
    })
}




module.exports = {
    learningResources: learningResources
};