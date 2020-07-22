/**
 * name : token/validator/v1.js
 * author : Rakesh Kumar
 * created-date : 21-July-2020
 * Description : All token related validation
 */

module.exports = (req) => {

    let tokenValidator = {
        
        verify: function () {
            req.checkBody('token').exists().notEmpty().withMessage("required token");
        }
       
    }
    if (tokenValidator[req.params.method]) {
        tokenValidator[req.params.method]();
    }

};