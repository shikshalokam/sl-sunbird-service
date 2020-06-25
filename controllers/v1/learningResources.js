/**
 * name : learningResources.js
 * author : Rakesh Kumar
 * created-date : 24-Jun-2020
 * Description : related to learning resources
 */

const learningResourceshelper = require(MODULES_BASE_PATH + "/learningResources/helper.js");

/**
   * LearningResources
   * @class
*/
module.exports = class LearningResources {

  static get name() {
    return "learningResources";
  }

  /**
  * @api {get} /sunbird-service/api/v1/learningResources/list 
  * To get list of learning resources
  * @apiVersion 1.0.0
  * @apiGroup Learning Resources
  * @apiHeader {String} X-authenticated-user-token Authenticity token
  * @apiSampleRequest /sunbird-service/api/v1/learningResources/list
  * @apiUse successBody
  * @apiUse errorBody
  * @apiParamExample {json} Response:
    {
    "message": "Learning resources found successfully",
    "status": 200,
    "result": [
        {
            "display": "{\"name\":{\"en\":\"Popular Worksheet\",\"hi\":\"लोकप्रिय वर्कशीट\"}}",
            "alt": null,
            "count": 0,
            "description": null,
            "index": 1,
            "sectionDataType": "content",
            "imgUrl": null,
            "resmsgId": "e6c90f20-b5f6-11ea-aa64-cf82d77f4119",
            "contents": null,
            "searchQuery": "{\"request\":{\"query\":\"\",\"filters\":{\"language\":[\"English\"],\"contentType\":[\"Worksheet\"]},\"limit\":10,\"sort_by\":{\"lastUpdatedOn\":\"desc\"}}}",
            "name": "Popular Worksheet",
            "id": "01228383082462412826",
            "apiId": "api.content.search",
            "group": 1
        },
        {
            "display": "{\"name\":{\"en\":\"Popular Story\",\"hi\":\"लोकप्रिय कहानी\"}}",
            "alt": null,
            "count": 0,
            "description": null,
            "index": 1,
            "sectionDataType": "content",
            "imgUrl": null,
            "resmsgId": "e6c98450-b5f6-11ea-aa64-cf82d77f4119",
            "contents": null,
            "searchQuery": "{\"request\":{\"query\":\"\",\"filters\":{\"language\":[\"English\"],\"contentType\":[\"Story\"]},\"limit\":10,\"sort_by\":{\"lastUpdatedOn\":\"desc\"}}}",
            "name": "Popular Story",
            "id": "01228383384379392023",
            "apiId": "api.content.search",
            "group": 2
        }
    ]
  }
  **/

  /**
   * For list
   * @method
   * @name create
   * @param  {req}  - requested data.
   * @returns {json} Response consists list of learning resource
  */

  list(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let response = await learningResourceshelper.list(req.userDetails.userToken);
        return resolve(response);

      } catch (error) {

        return reject({
          status:
            error.status ||
            httpStatusCode["internal_server_error"].status,

          message:
            error.message ||
            httpStatusCode["internal_server_error"].message
        });
      }
    });
  }

}