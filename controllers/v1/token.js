/**
 * name : token.js
 * author : Rakesh Kumar
 * created-date : 21-July-2020
 * Description : Related to user token
 */


const tokenHelper = require(MODULES_BASE_PATH + "/token/helper.js");

/**
   * Token 
   * @class
*/
module.exports = class Token {

  static get name() {
    return "token";
  }

  /**
  * @api {get} /sunbird/api/v1/token/verify
  * To verify the access token
  * @apiVersion 1.0.0
  * @apiGroup Token
  * @apiBody {String} X-authenticated-user-token Authenticity token
  * @apiSampleRequest /sunbird/api/v1/token/verify
  * @apiUse successBody
  * @apiUse errorBody
  * @apiParamExample {json} Request:
  * {
  *   "token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICItRjZVRW5nVHdlZFg1UlZaSkNnRFZWZ1IxYURjYmFrUUplams0cW
  * J1VTFNIn0.eyJqdGkiOiJiOWI4NTJkNi1hZWY3LTRjNTMtOGJhYS00YTQ1ZjZhN2IwZWQiLCJleHAiOjE1OTU1Njg2NzgsIm5iZiI6MCwiaWF0IjoxNT
  * k1NDgyMjc4LCJpc3MiOiJodHRwczovL2Rldi5ib2RoLnNoaWtzaGFsb2thbS5vcmcvYXV0aC9yZWFsbXMvc3VuYmlyZCIsImF1ZCI6ImFkbWluLWNsaS
  * IsInN1YiI6ImY6N2U3YjU2NmMtNTU0Yi00OGZjLWIyZTMtNDAyZGQ4MjUwNjE0OjcwNjhjNDVkLWJhOWMtNDg0ZS1hNTJjLTIwYmJhYjEzOWNhOSIsIn
  * R5cCI6IkJlYXJlciIsImF6cCI6ImFkbWluLWNsaSIsImF1dGhfdGltZSI6MCwic2Vzc2lvbl9zdGF0ZSI6IjJmMmMxM2Y1LThmMGQtNGZhZS05MGMzLW
  * UyNjNlNzJjOGRmYyIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOltdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiY3JlYXRlLXJlYWxtIiwib2
  * ZmbGluZV9hY2Nlc3MiLCJhZG1pbiIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnt9LCJuYW1lIjoiUGxhdGZvcm0gQWRtaW
  * 4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYWRtaW4iLCJnaXZlbl9uYW1lIjoiUGxhdGZvcm0gQWRtaW4iLCJmYW1pbHlfbmFtZSI6IiIsImVtYWlsIj
  * oicGEqKioqQHNoaWtzaGFsb2thbS5kZXYifQ.rw7eiYxetNrO5pJ7oEGykunjNkZGtAc1hGX-eV-iI8DOPaM10hjHD2pxVvflug7bUJlhLMQowWjNKnW
  * HEbFICoXQpKx75SBBMVY_rfXPGwNsFYioqWVqQ6pOKDTscJV27IUqAc88eSqZ0rfbKEPy0RizxRLc5qvsQK5SEEM665ueoPWcpInK7Yw07f5qUqBdV_d
  * etI5kS0QhffxC29r_-tmTP-YmvbyR54zB9Ai4qKG4_H9WUTjaEmGC7lVr7SqHRPI0btyxsAT-SIqi3vtJUTWFZ4de7NpEqfNBUztDBZTyqNoUn-A43so
  * ZiPyMJiE84OLl0U_UCRt1BUrhpmul5A"
  * }
  * @apiParamExample {json} Response:
    {
    "message": "Token is valid",
    "status": 200,
    "result": {
        "address": [],
        "avatar": null,
        "badgeAssertions": [],
        "channel": "SHIKSHALOKAM",
        "countryCode": null,
        "createdBy": "193cd013-5d7b-4c76-a649-835888b93bb9",
        "createdDate": "2018-10-24 16:45:31:634+0000",
        "currentLoginTime": null,
        "dob": null,
        "education": [],
        "email": "pa****@shikshalokam.dev",
        "emailVerified": false,
        "externalIds": [],
        "firstName": "Platform Admin",
        "gender": null,
        "grade": [],
        "id": "7068c45d-ba9c-484e-a52c-20bbab139ca9",
        "identifier": "7068c45d-ba9c-484e-a52c-20bbab139ca9",
        "isDeleted": false,
        "jobProfile": [],
        "language": [],
        "lastLoginTime": null,
        "lastName": "",
        "location": null,
        "organisations": [
            {
                "addedBy": "193cd013-5d7b-4c76-a649-835888b93bb9",
                "approvalDate": "2018-10-24 16:50:05:242+0000",
                "approvedBy": "193cd013-5d7b-4c76-a649-835888b93bb9",
                "hashTagId": "0125747659358699520",
                "id": "0126189555108741123",
                "isApproved": true,
                "isDeleted": false,
                "isRejected": false,
                "organisationId": "0125747659358699520",
                "orgJoinDate": "2018-10-24 16:50:05:242+0000",
                "roles": [
                    "LEAD_ASSESSOR",
                    "ASSESSOR"
                ],
                "userId": "7068c45d-ba9c-484e-a52c-20bbab139ca9"
            }
        ],
        "phone": "******0000",
        "phoneverified": null,
        "profileSummary": null,
        "profileVisibility": {
            "phone": "private",
            "email": "private"
        },
        "roles": [
            "PUBLIC"
        ],
        "rootOrg": {
            "addressId": null,
            "approvedBy": null,
            "approvedDate": null,
            "channel": "SHIKSHALOKAM",
            "communityId": null,
            "contactDetail": [],
            "createdBy": "193cd013-5d7b-4c76-a649-835888b93bb9",
            "createdDate": "2018-08-23 06:12:24:130+0000",
            "dateTime": null,
            "description": "ShikshaLokam",
            "externalId": null,
            "hashTagId": "0125747659358699520",
            "homeUrl": null,
            "id": "0125747659358699520",
            "identifier": "0125747659358699520",
            "imgUrl": null,
            "isApproved": null,
            "isDefault": null,
            "isRootOrg": true,
            "locationId": null,
            "locationIds": [],
            "noOfMembers": null,
            "orgCode": null,
            "orgName": "ShikshaLokam",
            "orgType": null,
            "orgTypeId": null,
            "parentOrgId": null,
            "preferredLanguage": null,
            "provider": null,
            "rootOrgId": "0125747659358699520",
            "slug": "shikshalokam",
            "status": 1,
            "theme": null,
            "thumbnail": null,
            "updatedBy": null,
            "updatedDate": null
        },
        "rootOrgId": "0125747659358699520",
        "skills": [],
        "status": 1,
        "subject": [],
        "tcStatus": null,
        "tcUpdatedDate": null,
        "tempPassword": null,
        "thumbnail": null,
        "updatedBy": null,
        "updatedDate": null,
        "userId": "7068c45d-ba9c-484e-a52c-20bbab139ca9",
        "userName": "pa****",
        "webPages": []
    }
}
  **/

  /**
   * To verify the access token
   * @method
   * @name verify
   * @param  {req}  - requested data.
   * @returns {json} Response consists user token details
  */

  verify(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let response = await tokenHelper.verify(req.body.token);
        return resolve(response);

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