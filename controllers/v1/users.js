/**
 * name : users.js
 * author : Rakesh Kumar
 * created-date : 04-Aug-2020
 * Description  User related information.
 */


/**
 * dependencies
 * 
 */
const usersHelper = require(MODULES_BASE_PATH + "/users/helper");



/**
    * Users
    * @class
*/



module.exports = class Users {

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
        return "users";
    }



      /**
  * @api {get} /sunbird/api/v1/users/getProfile/{{userId}} Get user profile
  * @apiVersion 1.0.0
  * @apiName Get user profile
  * @apiGroup Users
  * @apiHeader {String} X-authenticated-user-token Authenticity token
  * @apiHeader {String} internal-access-token Internal access token
  * @apiSampleRequest /sunbird/api/v1/users/getProfile/e97b5582-471c-4649-8401-3cc4249359bb
  * @apiUse successBody
  * @apiUse errorBody
  * @apiParamExample {json} Response:
  *{
    "message": "Platform user profile fetched successfully.",
    "status": 200,
    "result": {
        "response": {
            "webPages": [],
            "maskedPhone": null,
            "education": [],
            "rootOrgName": "SLDEV",
            "subject": [],
            "channel": "SLDEV",
            "language": [],
            "updatedDate": null,
            "skills": [],
            "flagsValue": 2,
            "id": "3125f88a-bf22-45f9-9311-2a55552657d6",
            "recoveryEmail": "",
            "identifier": "3125f88a-bf22-45f9-9311-2a55552657d6",
            "thumbnail": null,
            "profileVisibility": {
                "subject": "private",
                "language": "private",
                "avatar": "private",
                "userName": "public",
                "skills": "private",
                "firstName": "public",
                "badgeAssertions": "private",
                "phone": "private",
                "countryCode": "private",
                "dob": "private",
                "grade": "private",
                "location": "private",
                "email": "private"
            },
            "updatedBy": null,
            "jobProfile": [],
            "locationIds": [],
            "externalIds": [],
            "registryId": null,
            "rootOrgId": "01305447637218918413",
            "prevUsedEmail": "",
            "firstName": "XXXXX",
            "tncAcceptedOn": null,
            "phone": "",
            "dob": "1947-08-15",
            "grade": [],
            "currentLoginTime": null,
            "userType": "OTHER",
            "status": 1,
            "lastName": "kumar",
            "tncLatestVersion": "v1",
            "gender": "M",
            "roles": [
                "PUBLIC"
            ],
            "prevUsedPhone": "",
            "stateValidated": false,
            "badgeAssertions": [],
            "isDeleted": false,
            "organisations": [
                {
                    "orgJoinDate": "2020-08-03 07:14:20:473+0000",
                    "organisationId": "01307602653145497673",
                    "approvalDate": "2020-08-03 07:14:20:473+0000",
                    "isDeleted": false,
                    "hashTagId": "01307602653145497673",
                    "roles": [
                        "COURSE_MENTOR",
                        "PUBLIC"
                    ],
                    "isRejected": false,
                    "id": "01307803178981785681",
                    "isApproved": true,
                    "userId": "3125f88a-bf22-45f9-9311-2a55552657d6"
                }
            ],
            "rootOrg": {
                "dateTime": null,
                "preferredLanguage": null,
                "keys": {},
                "description": "Shikshalokam Development",
                "updatedDate": "2020-07-31 11:55:45:804+0000",
                "isRootOrg": true,
                "rootOrgId": "01305447637218918413",
                "imgUrl": null,
                "approvedDate": null,
                "orgTypeId": null,
                "homeUrl": null,
                "isDefault": null,
                "createdDate": "2020-07-01 00:38:06:141+0000",
                "parentOrgId": null,
                "createdBy": null,
                "hashTagId": "01305447637218918413",
                "noOfMembers": null,
                "status": 1
            },
            "address": [],
            "defaultProfileFieldVisibility": "private",
            "profileSummary": null,
            "phoneVerified": false,
            "recoveryPhone": "",
            "avatar": null,
            "userName": "XXXXX",
            "userId": "3125f88a-bf22-45f9-9311-2a55552657d6",
            "promptTnC": true,
            "lastLoginTime": null,
            "emailVerified": true,
            "framework": {},
            "createdDate": "2020-08-03 07:14:20:307+0000",
            "createdBy": "7068c45d-ba9c-484e-a52c-20bbab139ca9",
            "location": null,
            "tncAcceptedVersion": null
        }
    }
}
  */

  getProfile(req) {
    return new Promise(async (resolve, reject) => {
      try {
        let userId =  (req.params._id && req.params._id != "") ? req.params._id : req.userDetails.userId;
        let profileInfo = await usersHelper.getProfile(userId,req.userDetails.userToken);
        return resolve({ result: profileInfo.data, message: profileInfo.message });

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
   })
  }


    /**
  * @api {post} /sunbird/api/v1/users/create Create User 
  * @apiVersion 1.0.0
  * @apiName Create User 
  * @apiGroup Users
  * @apiHeader {String} X-authenticated-user-token Authenticity token
  * @apiHeader {String} internal-access-token Internal access token
  * @apiParam {reqeuestBody} consist of body of the request
  * @apiSampleRequest /sunbird/api/v1/users/create
  * @apiParamExample {json} Request:
  * {
  *   "firstName":"test",
  *   "lastName":"test",
  *   "email":"testUser12333@gmail.com",
  *   "phoneNumber":"1234567890",
  *   "userName":"testUser33@1234",
  *  "organisation":"0125747659358699520",
  *  "roles":["ORG_ADMIN"]
  *  "dateofbirth":"1994-0-01"
  * }
  * @apiUse successBody
  * @apiUse errorBody
  * @apiParamExample {json} Response:
  * 
  * {
  *   "message": "User created successfully.",
  *   "status": 200,
  *    "result": [ 
  *     {  
  *         "response": "SUCCESS",
  *         "userId": ""
  *     }
  *  ]
  * }
  */

  create(req) {
    return new Promise(async (resolve, reject) => {

      try {
       let userCreate = await usersHelper.create(req.body);
       return resolve({ result: userCreate.data, message: userCreate.message });

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
    })
  }

  /**
  * @api {post} /sunbird/api/v1/users/addUserToOrganisation Add user to the organisation
  * @apiVersion 1.0.0
  * @apiName Add user to the organisation
  * @apiGroup Users
  * @apiHeader {String} X-authenticated-user-token Authenticity token
  * @apiHeader {String} internal-access-token Internal access token
  * @apiParam {reqeuestBody} consist of body of the request
  * @apiSampleRequest /sunbird/api/v1/users/addUserToOrganisation
  * @apiParamExample {json} Request:
  {
   "userId":"dcdd40bf-6a95-49c3-81c3-2b000b870e38",
   "organisationId":"0125747659358699520",
    "roles":["ORG_ADMIN"]
   
  }
  * @apiUse successBody
  * @apiUse errorBody
  * @apiParamExample {json} Response:
  * 
  * {
  *   "message": "User added to organisation successfully.",
  *   "status": 200,
  * }
  */

 addUserToOrganisation(req) {
    return new Promise(async (resolve, reject) => {

      try {
       let addUserToorganisation = await usersHelper.addUserToOrganisation(req.body,req.userDetails.userToken);
       return resolve({ result: addUserToorganisation.data, message: addUserToorganisation.message });

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
    })
  }


   /**
   * @api {post} /sunbird/api/v1/users/activate Activate user
   * @apiVersion 1.0.0
   * @apiName Activate user
   * @apiGroup Users
   * @apiHeader {String} X-authenticated-user-token Authenticity token
   * @apiHeader {String} internal-access-token Internal access token
   * @apiParam {reqeuestBody} consist of body of the request
   * @apiSampleRequest /sunbird/api/v1/users/activate
   * {
   *   userId:""
   * }
   * @apiUse successBody
   * @apiUse errorBody
   * @apiSampleResponse
   * {
   *    "message": "User activated successfully.",
   *    "status": 200,
   *    "result": {
   *      "response": "SUCCESS"
   *    }
   * }
   */
  activate(req) {
    return new Promise(async (resolve, reject) => {

      try {

        let userStatusResponse = await usersHelper.activate(req.body.userId, req.userDetails.userToken);
        return resolve({ result: userStatusResponse.data, message: userStatusResponse.message });

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
    })
  }

  /**
   * @api {post} /sunbird/api/v1/users/inactivate Inactivate user
   * @apiVersion 1.0.0
   * @apiName Inactivate user
   * @apiGroup Users
   * @apiHeader {String} X-authenticated-user-token Authenticity token
   * @apiHeader {String} internal-access-token Internal access token
   * @apiParam {reqeuestBody} consist of body of the request
   * @apiSampleRequest /sunbird/api/v1/users/inactivate
   * {
   *   userId:""
   * }
   * @apiUse successBody
   * @apiUse errorBody
   * @apiSampleResponse
   * {
   *    "message": "User deactivated successfully.",
   *    "status": 200,
   *    "result": {
   *      "response": "SUCCESS"
   *    }
   * }
   */
  inactivate(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let userStatusResponse = await usersHelper.inactivate(req.body.userId, req.userDetails.userToken);
        return resolve({ result: userStatusResponse.data, message: userStatusResponse.message });

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
    })
  }




  /**
  * @api {get} /sunbird/api/v1/users/search
  * @apiVersion 1.0.0
  * @apiName User Search
  * @apiGroup Users
  * @apiHeader {String} internal-access-token Internal access token
  * @apiHeader {String} X-authenticated-user-token Authenticity token
  * @apiSampleRequest /sunbird/api/v1/users/search/
  * @apiParamExample {json} Response:
  * {
  *   "userName":"xxxxxx"
  * }
  * 
  * @apiUse successBody
  * @apiUse errorBody
  * @apiParamExample {json} Response:
  * 
  * {
  *   "message": "User list fetched successfully.",
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
  * Get users search.
  * @method
  * @name searchUsers
  * @param  {req}  - requested data.
  * @returns {json} Response consists of platform organisation list
  */

  search(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let usersList = await usersHelper.search(
          req.userDetails.userToken,
          req.body.userName ? req.body.userName : "",
          req.body.email ? req.body.email : "",
          req.body.phone ? req.body.phone : ""
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

}