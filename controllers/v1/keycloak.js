/**
 * name : Keycloak.js
 * author : Rakesh Kumar
 * created-date : 17-Aug-2020
 * Description : Keycloaks related information.
 *
**/

const KeycloakHelper = require(MODULES_BASE_PATH + "/keycloak/helper.js");
/**
    * Keycloak
    * @class
*/

module.exports = class Keycloak {

  static get name() {
    return "keycloak";
  }

  /**
  * @apiDefine errorBody
  * @apiError {String} status 4XX,5XX
  * @apiError {String} message Error
  */
  /**
    * @apiDefine successBody
    * @apiSuccess {String} status 200
    * @apiSuccess {String} result Data
  */

  /**
    * @api {get} /sunbird/api/v1/keycloak/generateToken Get keyclock token
    * Get keyclock token
    * @apiVersion 1.0.0
    * @apiGroup Keycloak
    * @apiHeader {String} internal-access-token Internal access token
    * @apiSampleRequest /sunbird/api/v1/keycloak/generateToken
    * @apiUse successBody
    * @apiUse errorBody
    * @apiParamExample {json} Request:
    * {
    *   "username" : "220750161",
    *   "password" : "punjab@123@PJ111"
    *  }
    * @apiParamExample {json} Response:
    * {
      "message": "User token fetched successfully.",
      "status": 200,
      "result": {
        "access_token": "eyJhbGciOiJSUzI1NiIs...       ...6zsxP6QhxIpJew",
        "expires_in": 86400,
        "refresh_expires_in": 0,
        "refresh_token": "eyJhbGciOiJSU.... ..8SSeflwQ",
        "token_type": "bearer",
        "not-before-policy": 1548955037,
        "session_state": "e28a35bb-adf5-4391-8670-a2bff2b9a54f"
      }
     }
 */

  /**
  * To get keycloak token
  * @method
  * @name generateToken
  * @param  {req}  - requested data.
  * @returns {json} Response consists of keycloak token
  */

 generateToken(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let tokenInfo = await KeycloakHelper.generateToken(req.body.username,req.body.password);
        
          return resolve({ result: tokenInfo.data, message: tokenInfo.message });

          
      } catch (error) {
        return reject({
          status:
            error.status ||
            HTTP_STATUS_CODE["internal_server_error"].status,
          message:
            error.message ||
            HTTP_STATUS_CODE["internal_server_error"].message
        });
      }
    });
  }

}