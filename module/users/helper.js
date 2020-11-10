/**
 * name : users/helper.js
 * author : Akash Shah
 * created-date : 03-Jan-2020
 * Description : All User module helper functions.
 */

const sunbirdService = require(GENERIC_SERVICES_PATH + "/sunbird");

/**
* All User module helper functions.
* @method
* @class  UsersHelper
*/

module.exports = class UsersHelper {


    /**
    * To get user profile details
    * @method
    * @name  getProfile
    * @param {String}  userId - Keycloak userId.
    * @param {String} token - user access token.
    * @returns {json} Response consists of user profile details.
    */
    static getProfile(userId, token) {
        return new Promise(async (resolve, reject) => {
            try {

                let response = await sunbirdService.getUserProfile(token, userId);
                if (response && response.responseCode == CONSTANTS.common.RESPONSE_OK) {
                    return resolve({ data: response.result, message: CONSTANTS.apiResponses.USER_PROFILE, success : true });
                } else {
                    throw new Error(response.message);
                }

            } catch (error) {
                return reject({
                    success: false,
                    message: error.message ? error.message : HTTP_STATUS_CODE["internal_server_error"].message,
                    data: false
                });
            }
        })

    }


    /**
    * Create a new user.
    * @method
    * @name  create
    * @param {String} userDetails - User details
    * @param {String} token - User access token
    * @returns {json} Response consists of created user details.
    */
    static create(userDetails, token="") {
        return new Promise(async (resolve, reject) => {
            try {
                let response = await sunbirdService.createUser(userDetails, token);
                if (response && response.response == CONSTANTS.common.SUNBIRD_SUCCESS) {
                    return resolve({ data: response, message: CONSTANTS.apiResponses.USER_CREATED, success : true });
                } else {
                    throw new Error(response.message);
                }

            } catch (error) {
                return reject({
                    success: false,
                    message: error.message ? error.message : HTTP_STATUS_CODE["internal_server_error"].message,
                    data: false
                });
            }
        })
    }

    /**
    * Add user to organisation
    * @method
    * @name  addUser
    * @param {String} userOrganisationRoleDetails - Consist of user roles by organisation
    * @param {String} token - user access token
    * @returns {json} Response consists of user details.
    */
   static addUserToOrganisation(userOrganisationRoleDetails, token) {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await sunbirdService.addUserToOrganisation(userOrganisationRoleDetails, token);
            if (response && response.response == CONSTANTS.common.SUNBIRD_SUCCESS) {
                return resolve({ data: response.result, message: CONSTANTS.apiResponses.USER_ADDED, success : true });
            } else {
                if(response.message){
                    throw new Error(response.message);
                }else{
                    throw new Error(response.response);
                }
                
            }

        } catch (error) {
            return reject({
                success: false,
                message: error.message ? error.message : HTTP_STATUS_CODE["internal_server_error"].message,
                data: false
            });
        }
    })
}

    /**
    * To activate the user
    * @method
    * @name  activate
    * @param {String} userId  - keyclock user id
    * @param {String} token - user access token   
    * @returns {json} Response consists of success or failure of the api.
    */
    static activate(userId, token) {
        return new Promise(async (resolve, reject) => {
            try {

                let response = await sunbirdService.activateUser(userId, token);
                if (response && response.response == CONSTANTS.common.SUNBIRD_SUCCESS) {
                    resolve({ result: response.result, message: CONSTANTS.apiResponses.USER_UNBLOCKED, success : true });
                } else {
                    throw new Error(response.message);
                }
            } catch (error) {
                return reject({
                    success: false,
                    message: error.message ? error.message : HTTP_STATUS_CODE["internal_server_error"].message,
                    data: false
                });
            }
        });
    }

    /**
     * To inactivate the user
     * @method
     * @name  inactivate
     * @param {String} userId  - keyclock user id
     * @param {String} token - user access token   
     * @returns {json} Response consists of success or failure of the api.
     */
    static inactivate(userId, token) {
        return new Promise(async (resolve, reject) => {
            try {

                let response = await sunbirdService.inactivateUser(userId, token);
                if (response && response.response == CONSTANTS.common.SUNBIRD_SUCCESS) {
                    resolve({ success: true, data: response.result, message: CONSTANTS.apiResponses.USER_BLOCKED, success : true });
                } else {
                    throw new Error(response.message);
                }
            } catch (error) {
                return reject({
                    success: false,
                    message: error.message ? error.message : HTTP_STATUS_CODE["internal_server_error"].message,
                    data: false
                });
            }
        });
    }


    /**
   * Search user.
   * @method
   * @name search
   * @param {String} token - user access token
   * @param {String} userId - user id
   * @param {String} organisationId - organisation id
   * @param {String} pageSize - maximum limit 
   * @param {String} pageNo - page number
   * @param {String} searchText - search text of users
   * @param {String} status - status of the users
   * @param {Array} requestedUsers - array of selected user id
   * @returns {json} Response consists of users of organisation.
   */

    static search(token, userId, userName, pageSize, pageNo, searchText, status = "", requestedUsers = []) {
        return new Promise(async (resolve, reject) => {
            try {

                let apiRequest = {
                    "filters": {
                        "userName": userName,
                    }
                }

                if (pageNo) {
                    apiRequest['offset'] = pageNo - 1;
                }
                if (pageSize) {
                    apiRequest['limit'] = pageSize;
                }
                if (searchText) {
                    apiRequest['query'] = searchText;
                }
                if (requestedUsers.length > 0) {
                    apiRequest['filters']["id"] = requestedUsers;
                }
                if (status) {
                    apiRequest['filters']['status'] = status;
                }

                let usersList =
                    await sunbirdService.users(token, apiRequest);


                if (usersList.response && usersList.response.content) {
                    return resolve({ data: usersList.response, success: true, message: CONSTANTS.apiResponses.LIST_OF_USERS, success: true });
                } else {
                    throw new Error(usersList.message);
                }

            } catch (error) {

                return reject({
                    success: false,
                    message: error.message ? error.message : HTTP_STATUS_CODE["internal_server_error"].message,
                    data: false
                });
            }
        })
    }
}