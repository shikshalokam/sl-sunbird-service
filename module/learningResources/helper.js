

const sunbirdService =
    require(GENERIC_SERVICES_PATH + "/sunbird.js");

const sessionsHelper = require(GENERIC_HELPERS_PATH + "/sessions.js");

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
    * @param {Array} board - board of the resource
    * @param {Array} gradeLevel - gradeLevel of the resource
    * @param {Array} subject - subject of the resource
    * @param {Array} medium - medium of the resource
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

                let learningResources = await sunbirdService.learningResources(token, pageSize, pageNo, filters, sortBy);
                if (learningResources && learningResources.content) {

                    resolve({
                        message: CONSTANTS.apiResponses.LEARNING_RESORCES_FOUND,
                        success: true,
                        data: {
                            content: learningResources.content,
                            count: learningResources.count
                        }
                    })

                } else {
                    throw new Error(CONSTANTS.apiResponses.LEARNING_RESORCES_NOT_FOUND);
                }

            } catch (error) {
                return resolve({
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
                const learningResourceFilterKey = "learning-resource-filters";

                let filters = sessionsHelper.get(learningResourceFilterKey);

                if (!filters) {

                    filters = await sunbirdService.filtersList(token);

                    let frameworkDetails = [];
                    if (filters.framework) {
                        frameworkDetails = filters.framework;
                    }

                    let categories = [];
                    if (frameworkDetails && frameworkDetails.categories) {
                        frameworkDetails.categories.map(function (category) {
                            let terms = [];
                            if (category.terms) {
                                category.terms.map(function (term) {
                                    terms.push({
                                        code: term.code,
                                        name: term.name
                                    })
                                });
                            }
                            let categoryObject = {
                                code: category.code,
                                terms: terms
                            }
                            categories.push(categoryObject);
                        });
                    }
                    filters = categories;
                    sessionsHelper.set(learningResourceFilterKey, categories);
                }

                resolve({
                    message: CONSTANTS.apiResponses.FILTERS_FOUND,
                    data: filters,
                    success: true
                });

            } catch (error) {
                return resolve({
                    success: false,
                    message: error.message ? error.message : HTTP_STATUS_CODE["internal_server_error"].message,
                    data: false
                });
            }
        })

    }

}