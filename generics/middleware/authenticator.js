/**
 * name : middleware/authenticator.js
 * author : Aman Karki
 * Date : 20-July-2020
 * Description : Keycloak authentication.
 */

// dependencies
const jwtDecode = require('jwt-decode');
const slackClient = require("../helpers/slack-communications");
const interceptor = require("./lib/api-interceptor");
const messageUtil = require("./lib/message-util");
let responseCode = require("../http-status-codes");
const shikshalokam = require("../helpers/shikshalokam");

const apiInterceptor = require('./apiInterceptor');

var reqMsg = messageUtil.REQUEST;


var respUtil = function (resp) {
  return {
    status: resp.errCode,
    message: resp.errMsg,
    currentDate: new Date().toISOString()
  };
};

var tokenAuthenticationFailureMessageToSlack = function (req, token, msg) {
  let jwtInfomration = jwtDecode(token)
  jwtInfomration["x-authenticated-user-token"] = token
  const tokenByPassAllowedLog = {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
    errorMsg: msg,
    customFields:
      jwtInfomration,
    slackErrorName: process.env.SLACK_ERROR_NAME,
    color: process.env.SLACK_ERROR_MESSAGE_COLOR
  }

  slackClient.sendMessageToSlack(tokenByPassAllowedLog)
}

var removedHeaders = [
  "host",
  "origin",
  "accept",
  "referer",
  "content-length",
  "accept-encoding",
  "accept-language",
  "accept-charset",
  "cookie",
  "dnt",
  "postman-token",
  "cache-control",
  "connection"
];

async function getAllRoles(obj) {
  let roles = await obj.roles;
  await _.forEach(obj.organisations, async value => {
    roles = await roles.concat(value.roles);
  });
  return roles;
}



module.exports = async function (req, res, next, token = "") {

  removedHeaders.forEach(function (e) {
    delete req.headers[e];
  });

  var token = req.headers["x-authenticated-user-token"];
  if (!req.rspObj) req.rspObj = {};
  var rspObj = req.rspObj;


  // Allow search endpoints for non-logged in users.
  let guestAccess = false;
  const guestAccessPaths = ["bodh/search", "bodh/request", "device"];
  await Promise.all(guestAccessPaths.map(async function (path) {
    if (req.path.includes(path)) {
      guestAccess = true;
    }
  }));

  if (guestAccess == true) {
    next();
    return;
  }

  const internalAccessApiPaths = ["keywords", "token/verify","keycloak/generateToken","users/create"];
  let performInternalAccessTokenCheck = false;
  await Promise.all(internalAccessApiPaths.map(async function (path) {
    if (req.path.includes(path)) {
      performInternalAccessTokenCheck = true;
    }
  }));

  
  if (performInternalAccessTokenCheck) {
    if (req.headers["internal-access-token"] == process.env.INTERNAL_ACCESS_TOKEN) {
      next();
      return;
    } else {
      rspObj.errCode = reqMsg.TOKEN.MISSING_CODE;
      rspObj.errMsg = reqMsg.TOKEN.MISSING_MESSAGE;
      rspObj.responseCode = responseCode.unauthorized;
      return res.status(HTTP_STATUS_CODE["unauthorized"].status).send(respUtil(rspObj));
    }
  }


  const securedApiPaths = ["learningResources/"];
  let tokenAndInternalAccessTokenRequired = false;
  await Promise.all(securedApiPaths.map(async function (path) {
    if (req.path.includes(path)) {
      tokenAndInternalAccessTokenRequired = true;
    }
  }));

  if (tokenAndInternalAccessTokenRequired) {
    if (req.headers["internal-access-token"] == process.env.INTERNAL_ACCESS_TOKEN && token) {
      req.userDetails = {};
      req.userDetails.userToken = token;
      next();
      return;
    } else {
      rspObj.errCode = reqMsg.TOKEN.MISSING_TOKEN_AND_INTERNAL_ACCESS_TOKEN_CODE;
      rspObj.errMsg = reqMsg.TOKEN.MISSING_TOKEN_AND_INTERNAL_ACCESS_TOKEN_MESSAGE;
      rspObj.responseCode = responseCode.unauthorized;
      return res.status(HTTP_STATUS_CODE["unauthorized"].status).send(respUtil(rspObj));
    }
  }


  if (!token) {
    rspObj.errCode = reqMsg.TOKEN.MISSING_CODE;
    rspObj.errMsg = reqMsg.TOKEN.MISSING_MESSAGE;
    rspObj.responseCode = responseCode.unauthorized;
    return res.status(HTTP_STATUS_CODE["unauthorized"].status).send(respUtil(rspObj));
  }

  apiInterceptor.validateToken(token, function (err, tokenData) {

    if (err) {
      rspObj.errCode = reqMsg.TOKEN.INVALID_CODE;
      rspObj.errMsg = reqMsg.TOKEN.INVALID_MESSAGE;
      rspObj.responseCode = responseCode.UNAUTHORIZED_ACCESS;

      tokenAuthenticationFailureMessageToSlack(
        req,
        token, "TOKEN VERIFICATION WITH KEYCLOAK FAILED"
      );
      return res.status(HTTP_STATUS_CODE["unauthorized"].status).send(respUtil(rspObj));
    } else {
      req.rspObj.userId = tokenData.userId;
      req.rspObj.userToken = req.headers["x-authenticated-user-token"];
      delete req.headers["x-authenticated-userid"];
      delete req.headers["x-authenticated-user-token"];
      // rspObj.telemetryData.actor = utilsService.getTelemetryActorData(req);
      req.headers["x-authenticated-userid"] = tokenData.userId;
      req.rspObj = rspObj;
      shikshalokam
        .userInfo(token, tokenData.userId)
        .then(async userDetails => {
          if (userDetails.responseCode == "OK") {
            req.userDetails = userDetails.result.response;
            req.userDetails.userToken = req.rspObj.userToken
            req.userDetails.allRoles = await getAllRoles(req.userDetails);
            next();
          } else {
            tokenAuthenticationFailureMessageToSlack(
              req,
              token,
              "TOKEN VERIFICATION - FAILED TO GET USER DETAIL FROM Kendra SERVICE"
            );

            rspObj.errCode = reqMsg.TOKEN.INVALID_CODE;
            rspObj.errMsg = reqMsg.TOKEN.INVALID_MESSAGE;
            rspObj.responseCode = responseCode.UNAUTHORIZED_ACCESS;
            return res.status(HTTP_STATUS_CODE["unauthorized"].status).send(respUtil(rspObj));
          }
        })
        .catch(error => {
          tokenAuthenticationFailureMessageToSlack(
            req,
            token,
            "TOKEN VERIFICATION - ERROR FETCHING USER DETAIL FROM Kendra SERVICE"
          );

          return res.status(HTTP_STATUS_CODE["unauthorized"].status).send(error);
        });
    }
  });


};
