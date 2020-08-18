/**
 * name : sunbird.js
 * author : Aman Jung Karki
 * Date : 11-Nov-2019
 * Description : All bodh service related information.
 */

//dependencies

const request = require('request');
const httpRequest = require(GENERIC_HELPERS_PATH + '/http-request');
const shikshalokamService = require(GENERIC_HELPERS_PATH + "/shikshalokam");
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
                        message: CONSTANTS.apiResponses.SUNBIRD_SERVICE_DOWN
                    };
                } else {
                    if (data.statusCode != 200) {
                        return resolve({
                            message: data.body.params.errmsg
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

function callToSunbird(requestType, url, token = "", requestBody = "") {

    return new Promise(async (resolve, reject) => {

        try {


            let options = {
                "headers": {
                    "content-type": "application/json",
                    "authorization": process.env.AUTHORIZATION,
                }
            };
            if (token) {
                options['headers']['x-authenticated-user-token'] = token;
            }

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
                        let message = "";
                        if (data.body && data.body.message) {
                            message = data.body.message;
                        } else {
                            message = data.body.params.errmsg;
                        }
                        return resolve({ message: message });

                    }

                }
            }

        } catch (error) {
            return reject({ message: error.message });
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
                    if (filters[filter] && filters[filter].length > 0) {
                        requestBody["filters"][filter] = filters[filter];
                    }
                });
            }
            requestBody['facets'] = keys;
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
            const apiEndPoint = CONSTANTS.endpoints.FRAMEWORK_LIST + "/" + process.env.SUNBIRD_FRAMEWORK;
            const response = await callToSunbird("GET", apiEndPoint, token);
            return resolve(response);

        } catch (error) {
            reject(error)
        }

    })
}

/**
  * create user
  * @function
  * @name createUser
  * @param requestBody - body data for creating user.
  * @param token - Logged in user token.
  * @returns {json} response consist of created user details
*/

const createUser = async function (userInputData, token = "") {
    return new Promise(async (resolve, reject) => {

        const createUserUrl = CONSTANTS.endpoints.SUNBIRD_CREATE_USER;

        let createUser = {
            firstName: userInputData.firstName,
            lastName: userInputData.lastName,
            phoneNumber: userInputData.phoneNumber,
            userName: userInputData.userName,
            password: userInputData.password,
            gender: userInputData.gender ? userInputData.gender.value : ""
        }

        if (userInputData.dateOfBirth) {
            createUser['dob'] = userInputData.dateOfBirth;
        }

        if (userInputData.email) {
            createUser['email'] = userInputData.email;
            createUser['emailVerified'] = true;
        }
        if (userInputData.phoneNumber) {
            createUser['phone'] = userInputData.phoneNumber;
            createUser['phoneVerified'] = true;
        }
        if (userInputData.address) {
            createUser['address'] = [{
                "addressLine1": address,
                "city": address
            }]
        }

        let response = await callToSunbird("POST", createUserUrl, token, createUser);
        return resolve(response);
    })

}


/**
  * Add user to organisation
  * @function
  * @name addUserToOrganisation
  * @param requestBody - body data for creating user.
  * @param token - Logged in user token.
  * @returns {json} response consist of sunbird api response details 
*/

const addUserToOrganisation = async function (requestBody, token) {
    return new Promise(async (resolve, reject) => {

        const adduserToOrgUrl = CONSTANTS.endpoints.SUNBIRD_ADD_USER_TO_ORG;
        let response = await callToSunbird("POST", adduserToOrgUrl, token, requestBody);
        return resolve(response);
    })

}


/**
  * To inactivate the user
  * @function
  * @name inactivate
  * @param userId -  user Id of the user.
  * @param token - Logged in user token.
  * @returns {JSON} - response consist of success or failure of the api.
*/

const inactivateUser = function (userId, token) {
    return new Promise(async (resolve, reject) => {

        const inActivateUserAPI = CONSTANTS.endpoints.SUNBIRD_BLOCK_USER;

        const requestBody = {
            userId: userId
        }
        const response = await callToSunbird("POST", inActivateUserAPI, token, requestBody);
        return resolve(response);

    })
}

/**
  * To activate the user
  * @function
  * @name activateUser
  * @param userId -  user Id of the user.
  * @param token - Logged in user token.
  * @returns {JSON} - response consist of success or failure of the api.
*/

const activateUser = function (userId, token) {
    return new Promise(async (resolve, reject) => {

        const activateUserAPI = CONSTANTS.endpoints.SUNBIRD_UNBLOCK_USER;
        const requestBody = {
            userId: userId
        }
        const response = await callToSunbird("POST", activateUserAPI, token, requestBody);
        return resolve(response);

    })
}

/**
  * To search the organisation 
  * @function
  * @name searchOrganisation
  * @param searchDetails - search details.
  * @param token - Logged in user token.
  * @returns {JSON} - All users data.
*/

const searchOrganisation = function (searchDetails, token) {
    return new Promise(async (resolve, reject) => {

        const searchOrgUrl = CONSTANTS.endpoints.SUNBIRD_SEARCH_ORG;
        const response = await callToSunbird("POST", searchOrgUrl, token, searchDetails);
        return resolve(response);

    });
}

/**
  * Get users.
  * @function
  * @name users
  * @param token - keyclock user access token
  * @param  {Object} apiRequest - apiRequest
  * @returns {JSON} - All users data.
*/

const users = function (token, apiRequest) {
    return new Promise(async (resolve, reject) => {

        const userSearchAPI = CONSTANTS.endpoints.SUNBIRD_SEARCH_USER;

        const response = await callToSunbird("POST", userSearchAPI, token, apiRequest);
        return resolve(response);
    })
}

/**
  * For creating organisation
  * @function
  * @name createOrganisation
  * @param  {Object} organisationDetails - organisation details object
  * @param {String} organisationDetails.description - description for the organisation
  * @param {String} organisationDetails.externalId - externalId
  * @param {String} organisationDetails.name - name of the organisation
  * @param {String} organisationDetails.address - address of the organisation
  * @param {String} organisationDetails.email - email id
  * @param  {String} token - keyclock access token
  * @returns {JSON} - created organisation info.
*/

const createOrganisation = function (organisationDetails, token) {
    return new Promise(async (resolve, reject) => {

        const createOrganisationUrl = CONSTANTS.endpoints.SUNBIRD_CREATE_ORG;
        const response = await callToSunbird("POST", createOrganisationUrl, token, organisationDetails);
        return resolve(response);

    });
}


/**
  * For updating organisation details
  * @function
  * @name updateOrganisationDetails
  * @param  {Object} organisationDetails - organisation details object
  * @param {String} organisationDetails.description - description for the organisation
  * @param {String} organisationDetails.externalId - externalId
  * @param {String} organisationDetails.name - name of the organisation
  * @param {String} organisationDetails.address - address of the organisation
  * @param {String} organisationDetails.email - email id
  * @param {String} organisationDetails.organisationId - organisation id
  * @param  {String} token - keyclock access token
  * @returns {JSON} - return updated organisation details
*/
const updateOrganisationDetails = function (organisationDetails, token) {
    return new Promise(async (resolve, reject) => {

        const updateOrgDetails = CONSTANTS.endpoints.SUNBIRD_UPDATE_ORG;
        const response = await callToSunbird("PATCH", updateOrgDetails, token, organisationDetails);
        return resolve(response);

    });
}

/**
  * To get organisational details
  * @function
  * @name getOrganisationDetails
  * @param organisationDetails - organisation details .
  * @param organisationDetails.organisationId - organisation id
  * @param token - keyclock access token.
  * @returns {JSON} - return updated organisation details
*/
const getOrganisationDetails = function (requestBody, token) {
    return new Promise(async (resolve, reject) => {

        const orgDetailsURL = CONSTANTS.endpoints.SUNBIRD_READ_ORG;
        const response = await callToSunbird("POST", orgDetailsURL, token, requestBody);
        return resolve(response);
    });
}

/**
  * For updating organisation status
  * @function
  * @name updateOrgStatus
  * @param {Object} organisationDetails - organisation details object
  * @param {String} organisationDetails.organisationId - organisation id
  * @param {String} organisationDetails.status - status code
  * @param  {token} token  - keyclock access token
  * @returns {JSON} - return updated organisation status
*/
const updateOrgStatus = function (organisationDetails, token) {
    return new Promise(async (resolve, reject) => {

        const updateOrgStatusUrl = CONSTANTS.endpoints.SUNBIRD_ORG_STATUS_UPDATE;
   
        const response = await callToSunbird("PATCH", updateOrgStatusUrl, token, organisationDetails);
        return resolve(response);
    });
}

/**
  * For remove user from the organisation
  * @function
  * @name removeUserFromOrganisation
  * @param {Object} userDetails - organisation user details 
  * @param {String} userDetails.organisationId - organisation id
  * @param {String} userDetails.userId - keyclock user id
  * @param  {token} token  - user access token
  * @returns {JSON} - response consist of removed user details
*/
const removeUserFromOrganisation = function (userDetails, token) {
    return new Promise(async (resolve, reject) => {

        const userRemoveApi = CONSTANTS.endpoints.SUNBIRD_REMOVE_USER_FROM_ORG;
        const response = await callToSunbird("POST", userRemoveApi, token, userDetails);
        return resolve(response);

    });
}

/**
  * To assign roles to user for a organisation.
  * @function
  * @name assignRoles
  * @param {Object} orgnisationInfo  - organisation object 
  * @param {String} orgnisationInfo.userId - userId
  * @param {String} orgnisationInfo.organisationId - organisationId
  * @param {Array} orgnisationInfo.roles - array of roles 
  * @param {String} token - keyclock access token
  * @returns {JSON} - assign roles information
*/

const assignRoles = function (orgnisationInfo, token) {
    return new Promise(async (resolve, reject) => {

        const assignRolesToOrgApiUrl = CONSTANTS.endpoints.SUNBIRD_ASSIGN_ROLES_TO_ORG;
        const response = await callToSunbird("POST", assignRolesToOrgApiUrl, token, orgnisationInfo);
        return resolve(response);

    })
}

/**
  * To get user keycloak token
  * @function
  * @name getToken
  * @param {Object} userCredentials  - keycloak credentials 
  * @param {String} userCredentials.userName - keyclock user name
  * @param {String} userCredentials.password - keyclock user password
  * @returns {JSON} - keycloak user token information
*/

const getToken = function (userCredentials) {
    return new Promise(async (resolve, reject) => {

        const keycloakAuthServerUrl =
            process.env.SUNBIRD_KEYCLOAK_AUTH_ENDPOINT + "/realms/" +
            process.env.SUNBIRD_KEYCLOAK_REALM + "/protocol/openid-connect/token"
        const response = await callKeyCloakService(keycloakAuthServerUrl, userCredentials);
        return resolve(response);

    })
}

/**
  * To make api call 
  * @function
  * @name callKeyCloakService
  * @param {String} url - api end point
  * @param {Json} data - request json data
  * @returns {JSON} - api response
*/

function callKeyCloakService(url = "", data = {}) {
    return new Promise(async (resolve, reject) => {
        try {

            url = process.env.SUNBIRD_BASE_URL + url;
            const reqObj = new httpRequest()
            const options = {
                form: data
            }

            const response = await reqObj.post(
                url,
                options
            )
            return resolve(response)

        } catch (error) {
            return reject(error);
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
    filtersList: filtersList,
    addUserToOrganisation: addUserToOrganisation,
    createUser: createUser,
    activateUser: activateUser,
    inactivateUser: inactivateUser,
    searchOrganisation: searchOrganisation,
    users: users,
    createOrganisation: createOrganisation,
    removeUserFromOrganisation: removeUserFromOrganisation,
    updateOrgStatus: updateOrgStatus,
    getOrganisationDetails: getOrganisationDetails,
    updateOrganisationDetails: updateOrganisationDetails,
    assignRoles: assignRoles,
    getToken: getToken
};