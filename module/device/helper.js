
/**
 * name : device/helper.js
 * author : Akash
 * created-date : 5-August-2020
 * Description : Helper functions of device module
 */

// Dependencies


/**
* Helper functions of device module
* @method
* @class  DeviceHelper
*/

module.exports = class DeviceHelper {

    /**
    * To register a device
    * @method
    * @name  register
    * @param {String} deviceId - Device ID
    * @param {Object} deviceInformation - Device related information.
    * @returns {json} Response consists of device registration
    */

    static register(deviceId, deviceInformation) {
        return new Promise(async (resolve, reject) => {
            try {

                deviceInformation.id = deviceId;

                const deviceData = 
                await cassandraDatabase.models.device.saveAsync(
                    deviceInformation
                );

                return resolve({
                    success : true,
                    message : CONSTANTS.apiResponses.DEVICE_REGISTER_SUCCESSFUL,
                    data : true
                })

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
    * To get a device profile
    * @method
    * @name  profile
    * @param {String} deviceId - Device ID
    * @returns {json} Response consists of device profile
    */
   
   static profile(deviceId) {
    return new Promise(async (resolve, reject) => {
        try {

            const deviceData = 
            await cassandraDatabase.models.device.findOneAsync(
                {
                    id : deviceId
                },{
                    allow_filtering: true
                }
            );

            return resolve({
                success : true,
                message : CONSTANTS.apiResponses.DEVICE_PROFILE_FETCH_SUCCESSFUL,
                data : deviceData
            })

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