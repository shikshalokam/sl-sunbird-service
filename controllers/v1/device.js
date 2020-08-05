/**
 * name : device.js
 * author : Akash Shah
 * created-date : 5-August-2020
 * Description : Related to device registry
 */


const deviceHelper = require(MODULES_BASE_PATH + "/device/helper.js");

/**
   * Device 
   * @class
*/
module.exports = class Device {

  static get name() {
    return "device";
  }

  /**
  * @api {post} /sunbird/api/v1/device/register/{{deviceId}}
  * To register a device profile.
  * @apiVersion 1.0.0
  * @apiGroup Device
  * @apiSampleRequest /sunbird/api/v1/device/register/b5929a4f5389bb4d3eb1c84fc75670677dcac4c0
  * @apiUse successBody
  * @apiUse errorBody
  * @apiParamExample {json} Request:
    {
        "request": {
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
    }
  * @apiParamExample {json} Response:
    {
      "message": "Device registered successfully.",
      "status": 200
    }
  **/

  /**
   * To register a deivce
   * @method
   * @name register
   * @param  {req}  - requested data.
   * @returns {json} Response consists success message
  */

  register(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let deviceRegistrationResponse = await deviceHelper.register(req.params._id,req.body.request);
        return resolve({ result:deviceRegistrationResponse.data,message:deviceRegistrationResponse.message });
        
      } catch (error) {

        return reject({
          status:
            error.status ||
            HTTP_STATUS_CODE["internal_server_error"].status,

          message:
            error.message ||
            HTTP_STATUS_CODE["internal_server_error"].message
        });
      }
    });
  }


  /**
  * @api {get} /sunbird/api/v1/device/profile/{{deviceId}}
  * To fetch a device profile.
  * @apiVersion 1.0.0
  * @apiGroup Device
  * @apiSampleRequest /sunbird/api/v1/device/profile/b5929a4f5389bb4d3eb1c84fc75670677dcac4c0
  * @apiUse successBody
  * @apiUse errorBody
  * @apiParamExample {json} Response:
    {
      "message": "Device profile fetched successfully.",
      "status": 200,
      "result" : {
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
    }
  **/

  /**
   * To fetch a device profile.
   * @method
   * @name profile
   * @param  {req}  - requested data.
   * @returns {json} Response consists details of the registered device id.
  */

  profile(req) {
    return new Promise(async (resolve, reject) => {
      try {

        const deviceProfile = await deviceHelper.profile(req.params._id);
        return resolve({ result:deviceProfile.data,message:deviceProfile.message });
        
      } catch (error) {

        return reject({
          status:
            error.status ||
            HTTP_STATUS_CODE["internal_server_error"].status,

          message:
            error.message ||
            HTTP_STATUS_CODE["internal_server_error"].message
        });
      }
    });
  }
}