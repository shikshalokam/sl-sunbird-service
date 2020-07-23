

const sunbirdService =
    require(GENERICS_FILES_PATH + "/services/sunbird.js");

const sessions = require(GENERICS_FILES_PATH + "/helpers/sessions.js");

/**
* learning resource related information be here.
* @method
* @class  LearningResourcesHelper
*/

module.exports = class LearningResourcesHelper {

    /**
    * To get list of learning resources
    * @method
    * @name  list
    * @param {String} token - user access token.
    * @param {String} pageSize - page size of the request
    * @param {String} pageNo - page no of the request
    * @param {String} board - board of the resource
    * @param {String} gradeLevel - gradeLevel of the resource
    * @param {String} subject - subject of the resource
    * @param {String} medium - medium of the resource
    * @param {String} sortBy - sortBy filter of the resource
    * @returns {json} Response consists of list of learning resources
    */
    static list(token, pageSize, pageNo, board, gradeLevel, subject, medium, sortBy) {
        return new Promise(async (resolve, reject) => {
            try {
                let filters = {
                    board: board,
                    gradeLevel: gradeLevel,
                    subject: subject,
                    medium: medium
                }
                sss
                let learningResources = await sunbirdService.learningResources(token, pageSize, pageNo, filters, sortBy);
                if (learningResources) {

                    if (learningResources.content) {
                        resolve({ message: CONSTANTS.apiResponses.LEARNING_RESORCES_FOUND, result: { data: learningResources.content, count: learningResources.count } })
                    } else {
                        reject({ message: CONSTANTS.apiResponses.LEARNING_RESORCES_NOT_FOUND });
                    }
                } else {
                    reject({ message: CONSTANTS.apiResponses.LEARNING_RESORCES_NOT_FOUND });
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
    * To get filters list
    * @method
    * @name  filtersList
    * @param {String} token - user access token.
    * @returns {json} Response consists of list of filters
    */
    static filtersList(token) {
        return new Promise(async (resolve, reject) => {
            try {
                let filters = sessions.get("Filters");
                if (!filters) {
                    filters = await sunbirdService.filtersList(token);
                }
                resolve({ message: CONSTANTS.apiResponses.FILTERS_FOUND, result: filters })

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