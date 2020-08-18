
/**
 * name : keycloak/helper.js
 * author : Rakesh Kumar
 * created-date : 17-Aug-2020
 * Description : Related to keyclock api's
 *
 */

// Dependencies

const sunbirdService = require(GENERIC_SERVICES_PATH + "/sunbird");

module.exports = class keycloakHelper {

    /**
    * To get keycloak user token
    * @method
    * @name  getToken
    * @param {String} username - user name of keycloak user
    * @param {String} password - password of keycloak user 
    * @returns {json} Response consists of keycloak user token
    */
    static getToken(username = "", password = "") {
        return new Promise(async (resolve, reject) => {
            try {

                if (username == "" || password == "") throw new Error("Invalid Credentials.")

                let keyCloakLoginResponse = await sunbirdService.getToken({
                    "client_id": process.env.SUNBIRD_KEYCLOAK_CLIENT_ID,
                    "username": username, 
                    "password": password,
                    "grant_type":process.env.SUNBIRD_KEYCLOAK_GRANT_TYPE,
                    "scope" : process.env.SUNBIRD_KEYCLOAK_SESSION_SCOPE
                })
               
                if (keyCloakLoginResponse.status == 200 && keyCloakLoginResponse.data && keyCloakLoginResponse.data.access_token && keyCloakLoginResponse.data.access_token != "") {
                    resolve({
                        message:CONSTANTS.apiResponses.TOKEN_FETCHED,
                        success: true,
                        data: keyCloakLoginResponse.data
                    })
                } else {
                   throw new Error(keyCloakLoginResponse.data.error_description);
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
};