/**
 * name : mongodb.js.
 * author : Aman Karki.
 * created-date : 02-Feb-2021.
 * Description : Mongodb health check.
*/

// Dependencies
const mongoose = require("mongoose");

function health_check() {
    return new Promise( async (resolve,reject) => {

        const db = mongoose.createConnection(process.env.MONGODB_URL + "/" + process.env.DB);
          
        db.on("error", function () {
            return resolve(false)
        });
        db.once("open", function() {
            mongoose.connection.close(function () {});
            return resolve(true);    
        });
    })
}

module.exports = {
    health_check : health_check
}