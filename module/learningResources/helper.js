

let sunbirdService =
    require(GENERICS_FILES_PATH + "/services/sunbird.js");

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
                    medium: medium,
                    sortBy: sortBy
                }
                let learningResources = await sunbirdService.learningResources(token, pageSize, pageNo, filters);
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
                return reject(error);
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
                let category = await sunbirdService.filtersList(token);
                if (category) {
                    if (category) {
                        resolve({ message: CONSTANTS.apiResponses.FILTERS_FOUND, result: category })
                    }
                }
                resolve(response);

            } catch (error) {
                return reject(error);
            }
        })

    }

}