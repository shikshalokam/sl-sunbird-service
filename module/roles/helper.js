/**
 * name : roles/helper.js
 * author : Rakesh Kumar
 * created-date : 06-July-2020
 * Description : sunbird roles related functionality.
 */

const sessionHelpers = require(GENERIC_HELPERS_PATH + "/sessions");

/**
   * RolesHelper
   * @class
*/



module.exports = class RolesHelper {

    /**
      * To get all platform roles
      * @method
      * @name list
      * @returns {Object} returns a platform roles information
     */

    static list() {
        return new Promise(async (resolve, reject) => {
            try {

                let roles = sessionHelpers.get("sunbirdRoles");
                if (!roles) {
                    let rolesDoc =
                        await cassandraDatabase.models.role.findAsync(
                            {   }, {
                            select:  ["id", "name"], raw: true, allow_filtering: true
                        });
                        sessionHelpers.set("sunbirdRoles",rolesDoc);

                    if (!rolesDoc) {
                           throw new Error(piResponses.ROLES_NOT_FOUND);
                    }
                    roles = rolesDoc;
                }
                return resolve({ message: CONSTANTS.apiResponses.ROLES_FOUND, data: roles,success:true });
                
            } catch (error) {
                return resolve({
                    success: false,
                    message: error.message ? error.message : HTTP_STATUS_CODE["internal_server_error"].message,
                    data: false
                });
            }
        })
    }


};