/**
 * name : device/validator/v1.js
 * author : Akash Shah
 * created-date : 5-August-2020
 * Description : All device API related validation
 */

module.exports = (req) => {

    let deviceValidator = {
        
        register: function () {
            req.checkParams('_id').exists().withMessage("required device id");
            req.checkBody('channel').exists().notEmpty().withMessage("required channel");
            req.checkBody('producer').exists().notEmpty().withMessage("required producer");
        },

        profile: function () {
            req.checkParams('_id').exists().withMessage("required device id");
        }
       
    }
    if (deviceValidator[req.params.method]) {
        deviceValidator[req.params.method]();
    }

};