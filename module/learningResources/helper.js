/**
 * name : learningResources/helper.js
 * author : Akash Shah
 * created-date : 03-Jan-2020
 * Description : All learning resources module helper functions.
 */


const sunbirdService =
    require(GENERIC_SERVICES_PATH + "/sunbird.js");

const sessionsHelper = require(GENERIC_HELPERS_PATH + "/sessions.js");

/**
* All learning resources module helper functions.
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
    * @param {Object} filters - resource filters
    * @param {Array} filters.board - board of the resource
    * @param {Array} filters.gradeLevel - gradeLevel of the resource
    * @param {Array} filters.subject - subject of the resource
    * @param {Array} filters.medium - medium of the resource
    * @param {String} sortBy - sortBy filter of the resources
    * @param {String} searchText - search text
    * @returns {json} Response consists of list of learning resources
    */
    static list(token, pageSize, pageNo, filters, sortBy,searchText) {
        return new Promise(async (resolve, reject) => {
            try {
               
                let learningResources = await sunbirdService.learningResources(token, pageSize, pageNo, filters, sortBy,searchText);
                if (learningResources && learningResources.content) {

                    let resources = []
                    if(learningResources.count > 0){
                        learningResources.content.map(function(resource){
                            resource['previewUrl'] = process.env.SUNBIRD_BASE_URL+CONSTANTS.common.CONTENT_PATH+resource.identifier;
                            resources.push(resource);
                        });
                    }

                    resolve({
                        message: CONSTANTS.apiResponses.LEARNING_RESORCES_FOUND,
                        success: true,
                        data: {
                            content: resources,
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