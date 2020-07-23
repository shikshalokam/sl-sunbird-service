/**
 * name : bodh.js
 * author : Aman Jung Karki
 * Date : 11-Nov-2019
 * Description : All bodh service related information.
 */

//dependencies

const request = require('request');
const shikshalokamService = require(PROJECT_ROOT_DIRECTORY + "/generics/helpers/shikshalokam");
const fs = require("fs");

/**
  * Generate Dial codes
  * @function
  * @name generateCodes
  * @param dialCodeData - body data for generating dial code.
  * @param dialCodeData.count - Count of dial code required.
  * @param dialCodeData.publisher - Publisher name.
  * @param token - Logged in user token.
  * @returns {Promise}
*/

const generateCodes = async function (dialCodeData, token) {

    const generateDialCodeUrl =
        process.env.SUNBIRD_BASE_URL + CONSTANTS.endpoints.SUNBIRD_GENERATE_DIALCODE;

    return new Promise(async (resolve, reject) => {

        const options = {
            "headers": {
                "content-type": "application/json",
                "authorization": process.env.AUTHORIZATION,
                "x-authenticated-user-token": token,
                "x-channel-id": process.env.SUNBIRD_ORGANISATION_ID
            },
            json: dialCodeData
        };

        request.post(generateDialCodeUrl, options, callback);

        function callback(err, data) {
            if (err) {
                return reject({
                    message: CONSTANTS.apiResponses.SUNBIRD_SERVICE_DOWN
                });
            } else {
                const dialCodeData = data.body;
                return resolve(dialCodeData);
            }
        }
    })

}

/**
  * Publish dial code
  * @function
  * @name publishCode
  * @param dialCodeData - body data for generating dial code.
  * @param codeId - publish code based on unique id.
  * @param token - logged in user token .
  * @param dialCodeData
  * @returns {Promise}
*/

const publishCode = async function (codeId, token, dialCodeData) {

    const publishDialCodeUrl =
        process.env.SUNBIRD_BASE_URL + CONSTANTS.endpoints.SUNBIRD_PUBLISH_DIALCODE + "/" + codeId;

    return new Promise(async (resolve, reject) => {

        const options = {
            "headers": {
                "content-type": "application/json",
                "authorization": process.env.AUTHORIZATION,
                "x-authenticated-user-token": token,
                "x-channel-id": process.env.SUNBIRD_ORGANISATION_ID
            },
            json: dialCodeData
        };

        request.post(publishDialCodeUrl, options, callback);

        function callback(err, data) {
            if (err) {
                return reject({
                    message: CONSTANTS.apiResponses.SUNBIRD_SERVICE_DOWN
                });
            } else {
                const dialCodeData = data.body;
                return resolve(dialCodeData);
            }
        }
    })
}

/**
  * Get the status of the published code.
  * @function
  * @name codeStatus
  * @param dialCodeData
  * @param token - logged in user token .
  * @returns {String} status code
*/

const codeStatus = async function (token, codeData) {

    const dialCodeStatusUrl =
        process.env.SUNBIRD_BASE_URL + CONSTANTS.endpoints.SUNBIRD_DIALCODE_STATUS;

    return new Promise(async (resolve, reject) => {

        const options = {
            "headers": {
                "content-type": "application/json",
                "authorization": process.env.AUTHORIZATION,
                "x-authenticated-user-token": token,
                "x-channel-id": process.env.SUNBIRD_ORGANISATION_ID
            },
            json: codeData
        };

        request.post(dialCodeStatusUrl, options, callback);

        function callback(err, data) {
            if (err) {
                return reject({
                    message: CONSTANTS.apiResponses.SUNBIRD_SERVICE_DOWN
                });
            } else {
                const dialCodeStatus = data.body;
                return resolve(dialCodeStatus);
            }
        }
    })

}

/**
  * Link the content data.
  * @function
  * @name linkContent
  * @param contentData - Link content data.
  * @param token - logged in user token.
  * @returns {String} status code
*/

const linkContent = async function (token, contentData) {

    const linkContentUrl =
        process.env.SUNBIRD_BASE_URL + CONSTANTS.endpoints.SUNBIRD_CONTENT_LINK;

    return new Promise(async (resolve, reject) => {

        const options = {
            "headers": {
                "content-type": "application/json",
                "authorization": process.env.AUTHORIZATION,
                "x-authenticated-user-token": token,
                "x-channel-id": process.env.SUNBIRD_ORGANISATION_ID
            },
            json: contentData
        };

        request.post(linkContentUrl, options, callback);

        function callback(err, data) {
            if (err) {
                return reject({
                    message: CONSTANTS.apiResponses.SUNBIRD_SERVICE_DOWN
                })
            } else {
                const linkContentData = data.body;
                return resolve(linkContentData);
            }
        }
    })

}

/**
  * Publish content.
  * @function
  * @name publishContent
  * @param contentData - Content data.
  * @param contentId - Publish content id.
  * @returns {String}
*/

const publishContent = async function (contentData, contentId) {

    const publishContentUrl =
        process.env.SUNBIRD_BASE_URL + CONSTANTS.endpoints.SUNBIRD_PUBLISH_CONTENT + "/" + contentId;

    return new Promise(async (resolve, reject) => {
        try {

            if (!global.publisherToken) {

                global.publisherToken =
                    await shikshalokamService.generateKeyCloakAccessToken(
                        process.env.SUNBIRD_PUBLISHER_USERNAME,
                        process.env.SUNBIRD_PUBLISHER_PASSWORD
                    );
            }

            let options = {
                "headers": {
                    "content-type": "application/json",
                    "authorization": process.env.AUTHORIZATION,
                    "x-authenticated-user-token": global.publisherToken.token,
                    "x-channel-id": process.env.SUNBIRD_ORGANISATION_ID
                },
                json: contentData
            };

            request.post(publishContentUrl, options, callback);

            function callback(err, data) {
                if (err) {
                    throw {
                        message:
                            CONSTANTS.apiResponses.SUNBIRD_SERVICE_DOWN
                    };
                } else {
                    const publishContentData = data.body;
                    return resolve(publishContentData)
                }
            }
        } catch (err) {
            return reject(err);
        }
    })

}


/**
  * Get user profile information.
  * @function
  * @name getUserProfile
  * @param token - Logged in user token.
  * @param userId - Logged in user id.
  * @returns {JSON} - user profile information
*/

const getUserProfile = async function (token, userId) {

    const userProfileUrl =
        process.env.SUNBIRD_BASE_URL + CONSTANTS.endpoints.SUNBIRD_USER_READ + "/" + userId;

    return new Promise(async (resolve, reject) => {
        try {

            const options = {
                "headers": {
                    "content-type": "application/json",
                    "authorization": process.env.AUTHORIZATION,
                    "x-authenticated-user-token": token
                }
            };

            request.get(userProfileUrl, options, callback);

            function callback(err, data) {
                if (err) {
                    throw {
                        message:
                            CONSTANTS.apiResponses.SUNBIRD_SERVICE_DOWN
                    };
                } else {
                    if (data.statusCode != 200) {
                        return resolve({
                            responseCode: "SUNBIRD_SERVICE_ERROR"
                        })
                    } else {
                        const userProfileInformationData = data.body;
                        return resolve(JSON.parse(userProfileInformationData))
                    }
                }
            }
        } catch (err) {
            return reject(err);
        }
    })

}

/**
  * Sync index
  * @function
  * @name indexSync
  * @param syncData - Sync 
  * @param syncData.requests.objectType
  * @param syncData.requests.userIds {Array} - user ids
  * @param token - Logged in user token.
  * @returns {Promise}
*/

const indexSync = async function (syncData, token) {

    const indexSyncUrl =
        process.env.SUNBIRD_BASE_URL + CONSTANTS.endpoints.SUNBIRD_INDEX_SYNC;

    return new Promise(async (resolve, reject) => {

        const options = {
            "headers": {
                "content-type": "application/json",
                "authorization": process.env.AUTHORIZATION,
                "x-authenticated-user-token": token,
                "x-channel-id": process.env.SUNBIRD_ORGANISATION_ID
            },
            json: syncData
        };

        request.post(indexSyncUrl, options, callback);

        function callback(err, data) {
            if (err) {
                return reject({
                    message: CONSTANTS.apiResponses.SUNBIRD_SERVICE_DOWN
                });
            } else {
                const indexSyncedData = data.body;
                return resolve(indexSyncedData);
            }
        }
    })

}

/**
  * Create content data
  * @function
  * @name createContent
  * @param contentData - content data.
  * @param token - Logged in user token.
  * @returns {Promise}
*/

const createContent = async function (contentData, token) {

    const contentUrl =
        process.env.SUNBIRD_BASE_URL + CONSTANTS.endpoints.SUNBIRD_CREATE_CONTENT;

    return new Promise(async (resolve, reject) => {

        const options = {
            "headers": {
                "content-type": "application/json",
                "authorization": process.env.AUTHORIZATION,
                "x-authenticated-user-token": token,
                "x-channel-id": process.env.SUNBIRD_ORGANISATION_ID
            },
            json: contentData
        };

        request.post(contentUrl, options, callback);

        function callback(err, data) {
            if (err) {
                return reject({
                    message: CONSTANTS.apiResponses.SUNBIRD_SERVICE_DOWN
                });
            } else {
                const contentData = data.body;
                return resolve(contentData);
            }
        }
    })

}

/**
  * Upload content data
  * @function
  * @name uploadContent
  * @param file - Upload file data.
  * @param contentId - content id.
  * @param token - logged in token.
  * @param contentType - content type.
  * @param mimeType - mime type.
  * @returns {Promise}
*/

const uploadContent = async function (file, contentId, token, contentType, mimeType) {

    const contentUrl =
        process.env.SUNBIRD_BASE_URL + CONSTANTS.endpoints.SUNBIRD_UPLOAD_CONTENT + `/${contentId}`;

    return new Promise(async (resolve, reject) => {

        const options = {
            "headers": {
                "content-type": contentType,
                "authorization": process.env.AUTHORIZATION,
                "x-authenticated-user-token": token,
                "x-channel-id": process.env.SUNBIRD_ORGANISATION_ID
            },
            formData: {
                "fileName": {
                    "value": fs.createReadStream(file),
                    "options": {
                        contentType: mimeType
                    }
                }
            }
        };

        request.post(contentUrl, options, callback);

        function callback(err, data) {
            if (err) {
                return reject({
                    message: CONSTANTS.apiResponses.SUNBIRD_SERVICE_DOWN
                });
            } else {
                const contentData = data.body;
                return resolve(JSON.parse(contentData));
            }
        }
    })

}

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

function callToSunbird(requestType, url, token, requestBody = "") {

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

        url = process.env.SUNBIRD_BASE_URL + url;
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
                    message: CONSTANTS.apiResponses.SUNBIRD_SERVICE_DOWN
                });
            } else {


                if (data.statusCode == HTTP_STATUS_CODE.ok.status) {

                    if (!data.body.responseCode) {
                        data.body = JSON.parse(data.body);
                    }
                    if (data.body && data.body.responseCode && data.body.responseCode == CONSTANTS.common.OK) {
                        if (data.body.result) {
                            return resolve(data.body.result);
                        }
                    }
                } else {
                    data.body = JSON.parse(data.body);
                    return reject({ message: data.body.params.errmsg });
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
  * @param sortBy
  * @returns {JSON} - consist of learning resources list
*/

const learningResources = function (token, limit, offset, filters = "", sortBy = "") {
    return new Promise(async (resolve, reject) => {

        try {

            const learningResourceUrl = CONSTANTS.endpoints.GET_RESOURCES;

            let requestBody = {
                "source": "web",
                "name": "Resource",
                "facets": ["board", "gradeLevel", "subject", "medium"],
                "filters": {
                    "contentType": ["Resource"],
                },
                "limit": limit,
                "mode": "soft",
                "offset": offset - 1
            }

            let keys = Object.keys(filters);
            if (keys && keys.length > 0) {
                keys.map(filter => {
                    requestBody["filters"][filter] = [filters[filter]];
                });
            }
            if (sortBy && sortBy == "popular") {
                requestBody["sort_by"] = {
                    "me_totalRatings": "desc"
                }
            }

            if (sortBy && sortBy == "recent") {
                requestBody["sort_by"] = {
                    "createdOn": "desc"
                }
            }

            let response = await callToSunbird("POST", learningResourceUrl, token, requestBody);
            return resolve(response);
        } catch (error) {
            reject(error)
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
            const apiEndPoint = CONSTANTS.endpoints.FRAMEWORK_LIST;
            let response = await callToSunbird("GET", apiEndPoint, token);
            return resolve(response);

        } catch (error) {
            reject(error)
        }

    })
}



module.exports = {
    generateCodes: generateCodes,
    publishCode: publishCode,
    codeStatus: codeStatus,
    linkContent: linkContent,
    publishContent: publishContent,
    getUserProfile: getUserProfile,
    indexSync: indexSync,
    createContent: createContent,
    uploadContent: uploadContent,
    learningResources: learningResources,
    filtersList: filtersList
};