
/**
 * name : token/helper.js
 * author : Rakesh Kumar
 * created-date : 21-july-2020
 * Description : Related to user token validation
 * to cloud service.
 */

// Dependencies
const apiInterceptor = require(PROJECT_ROOT_DIRECTORY + "/generics/middleware/apiInterceptor");
const shikshalokam = require(PROJECT_ROOT_DIRECTORY + "/generics/helpers/shikshalokam");


/**
* learning resource related information be here.
* @method
* @class  TokenHelper
*/

module.exports = class TokenHelper {

    /**
    * To validate the user token
    * @method
    * @name  verify
    * @param {String} token - user access token.
    * @returns {json} Response consists of user token details
    */
    static verify(token) {
        return new Promise(async (resolve, reject) => {
            try {

                apiInterceptor.validateToken(token, async function (err, tokenData) {
                    if (err) {
                        return resolve({
                            message: CONSTANTS.apiResponses.INVALID_TOKEN,
                            result: {
                                isValid: false
                            }
                        });
                    } else {
                        let userDetails = await shikshalokam.userInfo(token, tokenData.userId);
                        if (userDetails.responseCode == "OK") {
                            resolve({
                                message: CONSTANTS.apiResponses.VALID_TOKEN,
                                result: {
                                    isValid: true,
                                    userInformation: userDetails.result.response
                                }
                            })
                        } else {
                            return resolve({
                                message: CONSTANTS.apiResponses.INVALID_TOKEN,
                                result: {
                                    isValid: false
                                }
                            });
                        }
                    }
                });

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