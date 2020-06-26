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
    static list(token,limit,offset) {
        return new Promise(async (resolve, reject) => {
           try {
            let learningResources  = await sunbirdService.learningResources(token,limit,offset);
            // console.log("learningResources",learningResources);
            if(learningResources){
                if(learningResources.content){
                    resolve({ message:constants.apiResponses.LEARNING_RESORCES_FOUND,result:{ data: learningResources.content,count:learningResources.count  } })
                }else{
                    reject({ message:constants.apiResponses.LEARNING_RESORCES__NOT_FOUND })
                }
            }
            
            resolve(response);

           } catch (error) {
                return reject(error);
            }
        })

    }

        /**
    * To get list of laerning resources
    * @method
    * @name  list
    * @param {String} token - user access token.
    * @returns {json} Response consists of list of learning resources
    */
   static categoryList(token) {
    return new Promise(async (resolve, reject) => {
       try {
        let category  = await sunbirdService.categoryList(token);
        if(category){
            if(category){
                resolve({ message:constants.apiResponses.LEARNING_RESORCES_FOUND,result:category })
            }
        }
        
        resolve(response);

       } catch (error) {
            return reject(error);
        }
    })

}

}