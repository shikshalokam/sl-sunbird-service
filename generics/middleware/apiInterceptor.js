/**
 * name : middleware/apiInterceptor.js
 * author : ARakesh Kumar
 * Date : 21-July-2020
 * Description : Keycloak authentication.
 */

// dependencies
const jwtDecode = require('jwt-decode');
const slackClient = require("../helpers/slack-communications");
const interceptor = require("./lib/api-interceptor");
const messageUtil = require("./lib/message-util");

var keyCloakConfig = {
  authServerUrl : process.env.SUNBIRD_URL+ process.env.SUNBIRD_KEYCLOAK_AUTH_ENDPOINT,
  realm : process.env.SUNBIRD_KEYCLOAK_REALM,
  clientId : process.env.SUNBIRD_KEYCLOAK_CLIENT_ID,
  public : process.env.SUNBIRD_KEYCLOAK_PUBLIC
};

var cacheConfig = {
  store: process.env.SUNBIRD_CACHE_STORE,
  ttl: process.env.SUNBIRD_CACHE_TTL
};

var apiInterceptor = new interceptor(keyCloakConfig, cacheConfig);

module.exports = apiInterceptor;