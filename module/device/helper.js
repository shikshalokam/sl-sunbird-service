
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
   static profile(deviceId, deviceInformation) {
    return new Promise(async (resolve, reject) => {
        try {

            return resolve({
                success : true,
                message : CONSTANTS.apiResponses.DEVICE_PROFILE_FETCH_SUCCESSFUL,
                data : {
                    "dspec": {
                        "os": "Android 10",
                        "make": "Google Android SDK built for x86",
                        "id": "b5929a4f5389bb4d3eb1c84fc75670677dcac4c0",
                        "idisk": 774.89,
                        "edisk": 774.89,
                        "scrn": 5.25,
                        "camera": "",
                        "cpu": "abi: x86 processor\t: 0 ",
                        "sims": -1,
                        "webview": "74.0.3729.185"
                    },
                    "channel": "01305447637218918413",
                    "fcmToken": "dWquWc00sS8:APA91bEsVm5sR_j1ojaIHt1nVDAgjzrnpTgqaZrhB3gZWGkUPojsSJz_mkp7Jtk3tJA7Cjo__agZp1ypGeElqxUEU6TRcVzD8e3phWeCRJ6dx-6gOgrfCq3Y0r-RbEwMd5cFtOhKcJr_",
                    "producer": "org.shikshalokam.bodh.dev",
                    "first_access": 1595906837894
                }
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