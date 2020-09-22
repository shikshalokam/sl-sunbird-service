/**
 * name : roles.js
 * author : Rakesh Kumar
 * created-date : 13-April-2020
 * Description : All roles related information.
 */


/**
 * dependencies
 */
const roleshelper = require(MODULES_BASE_PATH + "/roles/helper.js");


/**
    * Roles
    * @class
*/

module.exports = class Roles extends Abstract {

    constructor() {
        super("role");
    }

    /**
     * @apiDefine errorBody
     * @apiError {String} status 4XX,5XX
     * @apiError {String} message Error
     */

    /**
     * @apiDefine successBody
     *  @apiSuccess {String} status 200
     * @apiSuccess {String} result Data
     */


    static get name() {
        return "roles";
    }

  /**
  * @api {get} /sunbird/api/v1/roles/list To get platform roles 
  * @apiVersion 1.0.0
  * @apiName Roles List
  * @apiGroup Roles
  * @apiHeader {String} internal-access-token Internal access token
  * @apiSampleRequest /sunbird/api/v1/roles/list
  * @apiUse successBody
  * @apiUse errorBody
  * @apiParamExample {json} Response:
  * 
  *{
    "message":"Roles found successfully.",
    "status": 200,
    "result": [
        {
            "id": "COURSE_MENTOR",
            "name": "Course Mentor"
        },
        {
            "id": "CONTENT_REVIEWER",
            "name": "Content Reviewer"
        },
        {
            "id": "TEACHER_BADGE_ISSUER",
            "name": "Teacher Badge Issuer"
        }
  *  ]
  * }
  */

 /**
   * To get all platform roles
   * @method
   * @name list
   * @param  {req}  - requested data.
   * @returns {json} Response consists platform roles
  */
   list(req) {
        return new Promise(async (resolve, reject) => {
          try {
    
            let roles = await roleshelper.list(req.body.token);
            return resolve({ result:roles.data, message:roles.message });
            
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

