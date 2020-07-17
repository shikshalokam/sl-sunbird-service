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

                    if(!data.body.responseCode){
                        data.body = JSON.parse(data.body);
                    }
                    if(data.body && data.body.responseCode  && data.body.responseCode == constants.common.RESPONSE_OK ){
                        if(data.body.result){
                           return resolve(data.body.result);
                        }
                    }
                }else{
                    if(! data.body && !data.body.params){
                        data.body = JSON.parse(data.body);
                    }
                    return reject({ message:data.body.params.errmsg });
                }
                
            }
        }

    });
}


/**
  * Get learning resources.
  * @function
  * @name learningResources
  * @param token - Logged in user token.
  * @param limit - page limit for the request 
  * @param offset - page offset for the request
  * @param filters - api filters for the request 
  * @returns {JSON} - consist of learning resources list
*/

const learningResources = function (token,limit,offset,filters = "") {
    return new Promise(async (resolve, reject) => {

        try {
        const learningResourceUrl = constants.apiEndpoints.GET_RESOURCES;
        
        let requestBody = {
            "source": "web",
            "name": "Resource",
            "facets": ["board", "gradeLevel", "subject", "medium"],
            "filters": {
                "contentType": ["Resource"],
            },
            "limit": limit,
            "mode": "soft",
            "offset": offset -1
          }

          if(filters){
              if(filters["board"]){
                requestBody["filters"]["board"] =[filters["board"]];
              }
              if(filters["gradeLevel"]){
                requestBody["filters"]["gradeLevel"] =[filters["gradeLevel"]];
              }
              if(filters["subject"]){
                requestBody["filters"]["subject"] =[filters["subject"]];
              }
              if(filters["medium"]){
                requestBody["filters"]["medium"] =[filters["medium"]];
              }

              if(filters['sortBy'] && filters['sortBy']=="popular"){
                requestBody["sort_by"]  = {
                    "me_totalRatings": "desc"
                 }
              }

              if(filters['sortBy'] && filters['sortBy']=="recent"){
                requestBody["sort_by"]  = {
                    "createdOn": "desc"
                 }
              }
          }

        let response = await callToSunbird("POST",learningResourceUrl,token,requestBody);
        return resolve(response);
    } catch (error) {
        reject(error )
   } 
    })
}

/**
  * Get learning filters.
  * @function
  * @name filtersList
  * @param token - Logged in user token.
  * @returns {JSON} - consist of learning filters list
*/

const filtersList = function (token) {
    return new Promise(async (resolve, reject) => {

        try {
            const apiEndPoint = constants.apiEndpoints.FRAMEWORK_LIST; 
            let response = await callToSunbird("GET",apiEndPoint,token);
            return resolve(response);

        } catch (error) {
             reject(error )
        } 
        
    })
}




module.exports = {
    learningResources: learningResources,
    filtersList: filtersList
};