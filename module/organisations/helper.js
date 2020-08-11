/**
 * name : organisations/helper.js
 * author : Rakesh Kumar
 * Date : 19-March-2020
 * Description : All platform organisation related information.
 */

const sunbirdService =
    require(GENERIC_SERVICES_PATH + "/sunbird");


module.exports = class OrganisationsHelper {

    /**
       * Get platform organisations list.
       * @method
       * @name list
       * @param {String} token - user access token
       * @param {String} pageSize - page size of the request
       * @param {String} pageNo - page number of the request
       * @param {String} searchText - text to search in a organisations
       * @param {String} status - organisation status filter
       * @returns {json} Response consists of organisations.
      */

    static list(token, pageSize, pageNo, searchText, status) {
        return new Promise(async (resolve, reject) => {
            try {

                if(pageNo >0){
                    pageNo = pageNo -1;
                }

                let request = {
                    "filters": {
                    },
                    "limit": pageSize,
                    "offset": pageNo
                }

                if (searchText) {
                    request['query'] = searchText;
                }
                if (status) {
                    request['filters']['status'] = status;
                }

                let response = await sunbirdService.searchOrganisation(request, token);
                if (response && response.response && response.response.content) {
                    return resolve({ data: response, message: CONSTANTS.apiResponses.ORG_INFO_FETCHED, success: true });
                } else {
                    throw new Error(response.message);
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
   * Get platform organisations users.
   * @method
   * @name users
   * @param {String} token - user access token
   * @param {String} userId - user id
   * @param {String} organisationId - organisation id
   * @param {String} pageSize - maximum limit 
   * @param {String} pageNo - page number
   * @param {String} searchText - search text of users
   * @param {String} status - status of the users
   * @param {Array} requestedUsers - array of selected user id
   * @returns {json} Response consists of users of organisation.
   */

    static users(token, userId, organisationId, pageSize, pageNo, searchText, status = "", requestedUsers = []) {
        return new Promise(async (resolve, reject) => {
            try {

                let apiRequest = {
                    "filters": {
                        "organisations.organisationId": organisationId,
                    }
                }

                if (pageNo) {
                    apiRequest['offset'] = pageNo - 1;
                }
                if (pageSize) {
                    apiRequest['limit'] = pageSize;
                }
                if (searchText) {
                    apiRequest['query'] = searchText;
                }
                if (requestedUsers.length > 0) {
                    apiRequest['filters']["id"] = requestedUsers;
                }
                if (status) {
                    apiRequest['filters']['status'] = status;
                }

                let usersList =
                    await sunbirdService.users(token, apiRequest);


                if (usersList.response && usersList.response.content) {
                    return resolve({ data: usersList.response, success: true, message: CONSTANTS.apiResponses.LIST_OF_ORG_USERS, success: true });
                } else {
                    throw new Error(usersList.message);
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
      * To assign roles to organisation for a user
      * @method
      * @name  assignRoles
      * @param {Object} organisationInfo  - organisation object 
      * @param {String} organisationInfo.userId - userId
      * @param {String} organisationInfo.organisationId - organisationId
      * @param {Array} organisationInfo.roles - array of roles 
      * @param {String} token - keyclock access token
      * @returns {json} Response consists of assign role information.
      */
    static assignRoles(organisationInfo, token) {
        return new Promise(async (resolve, reject) => {
            try {
                let assignRolesDetails = await sunbirdService.assignRoles(organisationInfo, token);

                if (assignRolesDetails && assignRolesDetails.response == CONSTANTS.common.SUNBIRD_SUCCESS) {
                    resolve({ data: assignRolesDetails.response, message: CONSTANTS.apiResponses.ASSIGNED_ROLE_SUCCESSFULLY, success: false });
                } else {
                    throw new Error(assignRolesDetails.message);
                }
            } catch (error) {
                return reject({
                    success: false,
                    message: error.message ? error.message : HTTP_STATUS_CODE["internal_server_error"].message,
                    data: false
                });
            }
        });
    }


    /** 
    * To create organisation.
    * @method
    * @name  create
    * @param  {Object} organisationDetails - organisation details object
    * @param {String} organisationDetails.description - description for the organisation
    * @param {String} organisationDetails.externalId - externalId
    * @param {String} organisationDetails.name - name of the organisation
    * @param {String} organisationDetails.address - address of the organisation
    * @param {String} organisationDetails.email - email id
    * @param  {String} token - keyclock access token
    * @returns {json} Response consists of success or failure of the api.
    */
    static create(organisationDetails, token) {
        return new Promise(async (resolve, reject) => {
            try {

                let requestBody = {
                    "channel": process.env.SUNBIRD_CHANNEL,
                    "description": organisationDetails.description,
                    "externalId": organisationDetails.externalId,
                    "provider": process.env.SUNBIRD_PROVIDER,
                    "orgName": organisationDetails.name,
                    "address": {
                        addressLine1: organisationDetails.address,
                        city: organisationDetails.address
                    },
                    "email": organisationDetails.email,
                }
                let createOrganisation = await sunbirdService.createOrganisation(requestBody, token);
                if (createOrganisation && createOrganisation.response && createOrganisation.response == CONSTANTS.common.SUNBIRD_SUCCESS) {
                    resolve({ data: createOrganisation, message: CONSTANTS.apiResponses.ORG_CREATED, success: true });
                } else {
                    throw new Error(createOrganisation.message);
                }

            } catch (error) {
                return reject({
                    success: false,
                    message: error.message ? error.message : HTTP_STATUS_CODE["internal_server_error"].message,
                    data: false
                });
            }
        });
    }



    /**
    * To update the organisational details
    * @method
    * @name  update
    * @param  {Object} organisationDetails - organisation details object
    * @param {String} organisationDetails.description - description for the organisation
    * @param {String} organisationDetails.externalId - externalId
    * @param {String} organisationDetails.name - name of the organisation
    * @param {String} organisationDetails.address - address of the organisation
    * @param {String} organisationDetails.email - email id
    * @param {String} organisationDetails.organisationId - organisation id
    * @param  {String} token - keyclock access token
    * @returns {json} Response consists of organisation update details.
    */

    static update(organisationDetails, token) {
        return new Promise(async (resolve, reject) => {
            try {

                let requestBody = {
                    orgName: organisationDetails.name ? organisationDetails.name : "",
                    email: organisationDetails.email ? organisationDetails.email : "",
                    description: organisationDetails.description ? organisationDetails.description : "",
                    organisationId: organisationDetails.organisationId,
                    address: {
                        addressLine1: organisationDetails.address,
                        city: organisationDetails.address
                    }
                }
                if (organisationDetails.externalId) {
                    requestBody['externalId'] = organisationDetails.externalId;
                    requestBody['provider'] = process.env.SUNBIRD_PROVIDER;
                }

                let updateOrg = await sunbirdService.updateOrganisationDetails(requestBody, token);
                if (updateOrg && updateOrg.response && updateOrg.response == CONSTANTS.common.SUNBIRD_SUCCESS) {
                    resolve({ data: updateOrg, message: CONSTANTS.apiResponses.ORG_UPDATED, success: true });
                } else {
                    throw new Error(updateOrg.message);
                }

            } catch (error) {
                return reject({
                    success: false,
                    message: error.message ? error.message : HTTP_STATUS_CODE["internal_server_error"].message,
                    data: false
                });
            }
        });
    }


    /**
    * To get the organisational details
    * @method
    * @name  details
    * @param  {String} organisationId - organisation id
    * @param  {String} token - keyclock access token
    * @returns {json} Response consists oforganisation details
    */

    static details(organisationId, token) {
        return new Promise(async (resolve, reject) => {
            try {

                let organisationDetails = await sunbirdService.getOrganisationDetails({ organisationId: organisationId }, token);

                if (organisationDetails && organisationDetails.response) {
                    resolve({ data: organisationDetails.response, message: CONSTANTS.apiResponses.ORG_DETAILS_FOUND, success: true });
                } else {
                    throw new Error(organisationDetails.message);
                }

            } catch (error) {
                return reject({
                    success: false,
                    message: error.message ? error.message : HTTP_STATUS_CODE["internal_server_error"].message,
                    data: false
                });
            }
        });
    }


    /**
    * To\update organisation status
    * @method
    * @name  updateStatus
    * @param {Object} organisationDetails - organisation details object
    * @param {String} organisationDetails.organisationId - organisation id
    * @param {String} organisationDetails.status - status code
    * @param  {token} token  - keyclock access token
    * @returns {json} Response consists of organisation update status info
    */

    static updateStatus(organisationDetails, token) {
        return new Promise(async (resolve, reject) => {
            try {

                let updateOrg = await sunbirdService.updateOrgStatus(organisationDetails, token);
                if (updateOrg && updateOrg.response && updateOrg.response == CONSTANTS.common.SUNBIRD_SUCCESS) {

                    let msg = CONSTANTS.apiResponses.ORG_ACTIVATED;
                    if (organisationDetails.status == 0) {
                        msg = CONSTANTS.apiResponses.ORG_DEACTIVATED;
                    }
                    resolve({ data: updateOrg.result, message: msg, success: true });
                } else {
                    throw new Error(updateOrg.message);
                }

            } catch (error) {
                return reject({
                    success: false,
                    message: error.message ? error.message : HTTP_STATUS_CODE["internal_server_error"].message,
                    data: false
                });
            }
        });
    }

    /**
    * remove user from the organisation
    * @method
    * @name  removeUser
    * @param {Object} organisationDetails - organisation user details 
    * @param {String} organisationDetails.organisationId - organisation id
    * @param {String} organisationDetails.userId - keyclock user id
    * @param  {token} token  - user access token
    * @returns {json} Response consists of organisation removed user info
    */

    static removeUser(organisationDetails, token) {
        return new Promise(async (resolve, reject) => {
            try {

                let removeUser = await sunbirdService.removeUser(organisationDetails, token);
                if (removeUser && removeUser.response && removeUser.response == CONSTANTS.common.SUNBIRD_SUCCESS) {
                    resolve({ data: removeUser, message: CONSTANTS.apiResponses.USER_REMOVED, success: true });
                } else {
                    throw new Error(removeUser.message);
                }

            } catch (error) {
                return reject({
                    success: false,
                    message: error.message ? error.message : HTTP_STATUS_CODE["internal_server_error"].message,
                    data: false
                });
            }
        });
    }

};
