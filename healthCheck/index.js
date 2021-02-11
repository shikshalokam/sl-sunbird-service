/**
 * name : index.js.
 * author : Aman Karki.
 * created-date : 02-Feb-2021.
 * Description : Health check Root file.
*/

// Dependencies
let healthCheckService = require("./healthCheckService");

module.exports = function (app) {
    app.get("/health",healthCheckService.health_check);
    app.get("/healthCheckStatus",healthCheckService.healthCheckStatus);
}