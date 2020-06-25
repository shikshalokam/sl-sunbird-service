const { constant } = require("lodash");

let sunbirdService =
    require(ROOT_PATH + "/generics/services/sunbird");

/**
* learning resource related information be here.
* @method
* @class  learningResourcesHelper
*/

module.exports = class learningResourcesHelper {

    /**
    * To get list of laerning resources
    * @method
    * @name  list
    * @param {String} token - user access token.
    * @returns {json} Response consists of list of learning resources
    */
    static list(token) {
        return new Promise(async (resolve, reject) => {
           try {
            let learningResources  = await sunbirdService.learningResources(token);
            if(learningResources){
                if(learningResources.response){
                    resolve({ message:constants.apiResponses.LEARNING_RESORCES_FOUND,result:learningResources.response.sections })
                }
            }
            
            resolve(response);

           } catch (error) {
                return reject(error);
            }
        })

    }

}