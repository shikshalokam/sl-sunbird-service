/**
 * name : organisations.js
 * author : Rakesh Kumar
 * created-date : 5-Aug-2020
 * Description : organisations related information.
 */

const organisationsHelper = require(MODULES_BASE_PATH + "/organisations/helper.js");
/**
    * Organisations
    * @class
*/

module.exports = class Organisations {

  static get name() {
    return "organisations";
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
    * @api {get} /sunbird/api/v1/organisations/list list
    * Get platform organisations list.
    * @apiVersion 1.0.0
    * @apiGroup Organisations
    * @apiHeader {String} internal-access-token Internal access token
    * @apiHeader {String} X-authenticated-user-token Authenticity token
    * @apiSampleRequest /sunbird/api/v1/organisations/list 
    * @apiUse successBody
    * @apiUse errorBody
    * @apiParamExample {json} Response:
    * 
    * {
    *   "message": "Organisation list fetched Successfully",
    *   "status": 200,
    *    "result": [ 
    *     {  
    *         "value": "0125747659358699520",
    *          "label": "ShikshaLokamDev"
    *     }
    *  ]
    * }
 */

  /**
  * Get organisation list
  * @method
  * @name list
  * @param  {req}  - requested data.
  * @returns {json} Response consists of platform organisation list
  */

  list(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let organisationList = await organisationsHelper.list(
          req.userDetails.userToken,
          req.pageSize,
          req.pageNo,
          req.searchText,
          req.query.status
          );
        
          return resolve({ result: organisationList.data, message: organisationList.message });

          
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

  /**
  * @api {get} /sunbird/api/v1/organisations/users Users
  * Get platform users list for organisation.
  * @apiVersion 1.0.0
  * @apiGroup Organisations
  * @apiHeader {String} internal-access-token Internal access token
  * @apiHeader {String} X-authenticated-user-token Authenticity token
  * @apiSampleRequest /sunbird/api/v1/organisations/users/
  * @apiParamExample {json} Response:
  * {
  *   "organisationId":"xxxxxx"
  * }
  * 
  * @apiUse successBody
  * @apiUse errorBody
  * @apiParamExample {json} Response:
  * 
  * {
  *   "message": "Organisation list fetched Successfully",
  *   "status": 200,
  *    "result": {
  *      "count": 1,
  *       "usersList": [ {
  *            "lastName": "",
  *             "email": "",
  *             "firstName": "abcd", 
  *          }
  *       ]
  *    }   
  * }
  * 
  * 
*/

  /**
  * Get platform users list for organisation.
  * @method
  * @name users
  * @param  {req}  - requested data.
  * @returns {json} Response consists of platform organisation list
  */

  users(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let usersList = await organisationsHelper.users(
          req.userDetails.userToken,
          req.userDetails.userId,
          req.body.organisationId,
          req.pageSize, 
          req.pageNo,
          req.body.query ? req.body.query : "",
          req.body.status ? req.body.status : ""
        );
        return resolve({ result: usersList.data, message: usersList.message });

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


  /**
 * @api {post} /sunbird/api/v1/organisations/assignRoles Assign Roles
 * To assign Roles to the organisation for the user
 * @apiVersion 1.0.0
 * @apiGroup Organisations
 * @apiHeader {String} internal-access-token Internal access token
 * @apiHeader {String} X-authenticated-user-token Authenticity token
 * @apiSampleRequest /sunbird/api/v1/organisations/assignRoles
 * @apiParamExample {json} Request:
 * {
 *   "userId":"",
 *   "organisationId":"0125747659358699520",
 *   "roles":["ASSESSOR"]
 * }
 * 
 * @apiUse successBody
 * @apiUse errorBody
 * @apiParamExample {json} Response:
 * 
 * {
 *  "status": 200,
 *  "message": ""message": "User roles added to organisation  successfully"
 *      "result": {
 *          "response": "SUCCESS"
 *      }
 *  }
 * }
 * 
 * 
*/

  /**
  * To assign Roles to the organisation for the user
  * @method
  * @name assignRoles
  * @param  {req}  - requested data.
  * @returns {json} Response consists of success or failure of the request
  * 
  */

  assignRoles(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let orgDetails = {
          organisationId: req.body.organisationId,
          userId: req.body.userId,
          roles: req.body.roles
        }
        let updateRolesInfo = await organisationsHelper.assignRoles(orgDetails, req.userDetails.userToken);
        return resolve({ result: updateRolesInfo.data, message: updateRolesInfo.message });

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



  /**
   * @api {post} /sunbird/api/v1/organisations/create Create
   * To create the organisation
   * @apiVersion 1.0.0
   * @apiGroup Organisations
   * @apiHeader {String} X-authenticated-user-token Authenticity token
   * @apiSampleRequest /sunbird/api/v1/organisations/create
   * @apiParamExample {json} Request:
   * {
      "description": "for test",
      "externalId": "ext1332sdddda2ww22",
      "provider": "string",
      "name": "testing",
      "email2": "abc@gmail.com",
      "address": "iiii"
    }
   * @apiUse successBody
   * @apiUse errorBody
   * @apiParamExample {json} Response:
   * 
   * {
   *  "status": 200,
   *  "message": ""message": "Organisation List fetched Successfully"
   *      "result": {
   *          "columns":[{
   *             "type": "column",
   *             "visible": true,
   *             "label": "organisation Name",
   *             "key": "organisationName"
   *         }],
   *         data:[{
   *             organisationName:”Mantra4Change”,
   *             description:”ShikshaLokam Development”,
   *             status:”Active/Inactive”,
   *             noOfMembers::”10”,
   *         }]
   *      }
   *  }
   * }
   * 
   * 
 */

  /**
  * To create the organisation
  * @method
  * @name create
  * @param  {req}  - requested data.
  * @returns {json} Response consists of platform organisation list
  */

  create(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let organisationCreate = await organisationsHelper.create(req.body, req.userDetails.userToken);
        
        return resolve({ result: organisationCreate.data, message: organisationCreate.message });

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

  /**
     * @api {post} /sunbird/api/v1/organisations/update Update
     * To update organisation details
     * @apiVersion 1.0.0
     * @apiGroup Organisations
     * @apiHeader {String} X-authenticated-user-token Authenticity token
     * @apiSampleRequest /sunbird/api/v1/organisations/update
     * @apiParamExample {json} Request:
     * {
     *  name:"organisation name",
     *  email:"abc@gmail.com",
     *  description:"new organisation",
     *  externalId:"external123",
     *  organisationId:"XXXXXXXXXXXX"
     * }
     * @apiUse successBody
     * @apiUse errorBody
     * @apiParamExample {json} Response:
     * {
     *  "message": "Organisation Created Successfully",
     *  "status": 200,
     *  "result": {
     *     "organisationId": "013014480583598080574",
     *   "response": "SUCCESS"
     *   }
     * }
     * 
   */
  /**
   * To update organisation data
   * @method
   * @name update
   * @param  {req}  - requested data.
   * @returns {json} Response consists of organisation create form
   */

  update(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let updateOrganisation = await organisationsHelper.update(req.body, req.userDetails.userToken);
        
        return resolve({ result: updateOrganisation.data, message: updateOrganisation.message });

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


  /**
     * @api {get} /sunbird/api/v1/organisations/details/:organisationId Organisation Details
     * To get organisation details
     * @apiVersion 1.0.0
     * @apiGroup Organisations
     * @apiHeader {String} X-authenticated-user-token Authenticity token
     * @apiSampleRequest /sunbird/api/v1/organisations/details/013014480583598080574
     * @apiUse successBody
     * @apiUse errorBody
     * @apiParamExample {json} Response:
     * {
     *  "message": "Organisation Details Fetched Successfully",
     *  "status": 200,
     *  "result": {
     *     "organisationId": "013014480583598080574",
     *     "name": "",
     *     "email":"",
     *     "provider":"",
     *     "externalId":""
     *   }
     * }
     * 
   */
  /**
   * To get organisation details
   * @method
   * @name details
   * @param  {req}  - requested data.
   * @returns {json} Response consists of organisation details
   */

  details(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let organisationDetails = await organisationsHelper.details(req.params._id, req.userDetails.userToken);

        return resolve({ result: organisationDetails.data, message: organisationDetails.message });

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

  /**
     * @api {post} /sunbird/api/v1/organisations/updateStatus Organisation Status Update
     * To update organisation status
     * @apiVersion 1.0.0
     * @apiGroup Organisations
     * @apiHeader {String} X-authenticated-user-token Authenticity token
     * @apiSampleRequest /sunbird/api/v1/organisations/updateStatus
     * @apiParamExample {json} Request:
     * {
     *   "organisationId": "013014480583598080574",
     *   "status":"0"
     * }
     * @apiUse successBody
     * @apiUse errorBody
     * @apiParamExample {json} Response:
     * {
     *  "message": "Organisation Status Update Successfully",
     *  "status": 200,
     *  "result": {
     *     "response": "SUCCESS",
     *   }
     * }
     * 
   */
  /**
   * To update organisation status
   * @method
   * @name updateStatus
   * @param  {req}  - requested data.
   * @returns {json} Response consists updated organisation status
   **/

  updateStatus(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let statusUpdate = await organisationsHelper.updateStatus(req.body, req.userDetails.userToken);
        
        return resolve({ result: statusUpdate.data, message: statusUpdate.message });

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


  /**
     * @api {get} /sunbird/api/v1/organisations/removeUser   Remove user
     * To remove User from organisation
     * @apiVersion 1.0.0
     * @apiGroup Organisations
     * @apiHeader {String} X-authenticated-user-token Authenticity token
     * @apiSampleRequest /sunbird/api/v1/organisations/removeUser
     * {
     *   "organisationId": "",
     *   "userId":""
     * }
     * @apiUse successBody
     * @apiUse errorBody
     * @apiParamExample {json} Response:
     * {
     *  "message": "user removed from Organisation Successfully",
     *  "status": 200,
     *  "result": {
     *     "response": "success",
     *   }
     * }
     * 
   */
  /**
   * To Remove user from the Organisation
   * @method
   * @name updateStatus
   * @param  {req}  - requested data.
   * @returns {json} Response consists removed user status
   **/

  removeUser(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let removeUser = await organisationsHelper.removeUser(req.body, req.userDetails.userToken);
        return resolve({ result: removeUser.data, message: removeUser.message });

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
};