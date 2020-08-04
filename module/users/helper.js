let sunbirdService =
    require(GENERIC_SERVICES_PATH + "/sunbird");

/**
* user related information be here.
* @method
* @class  UsersHelper
*/

module.exports = class UsersHelper {


    /**
    * To get user profile details
    * @method
    * @name  getProfile
    * @param {String}  userId - Logged in user details.
    * @param {String} token - user access token.
    * @returns {json} Response consists of user profile details.
    */
    static getProfile(userId, token) {
        return new Promise(async (resolve, reject) => {
            try {

                let response = await sunbirdService.getUserProfile(token, userId);
                if (response && response.responseCode == CONSTANTS.common.RESPONSE_OK) {
                    return resolve({ data: response.result, message: CONSTANTS.apiResponses.USER_PROFILE });
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
    * @param {String} request - consist of new user details
    * @param {String} token - user access token
    * @param {String} userId  - logged in userId.
    * @returns {json} Response consists of created user details.
    */
    static create(request, token, userId) {
        return new Promise(async (resolve, reject) => {
            try {
                let response = await sunbirdService.createUser(request, token);
                if (response && response.response == CONSTANTS.common.SUNBIRD_SUCCESS) {
                    return resolve({ data: response, message: CONSTANTS.apiResponses.USER_CREATED });
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
    * @param {String} request - consist of new user details
    * @param {String} token - user access token
    * @returns {json} Response consists of created user details.
    */
   static addUserToOrganisation(request, token) {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await sunbirdService.addUserToOrganisation(request, token);
            if (response && response.response == CONSTANTS.common.SUNBIRD_SUCCESS) {
                return resolve({ result: response.result, message: CONSTANTS.apiResponses.USER_ADDED });
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

                let response = await sunbirdService.activate(userId, token);
                if (response && response.response == CONSTANTS.common.SUNBIRD_SUCCESS) {
                    resolve({ result: response.result, message: CONSTANTS.apiResponses.USER_UNBLOCKED });
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

                let response = await sunbirdService.inactivate(userId, token);
                if (response && response.response == CONSTANTS.common.SUNBIRD_SUCCESS) {
                    resolve({ success: true, data: response.result, message: CONSTANTS.apiResponses.USER_BLOCKED });
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
}