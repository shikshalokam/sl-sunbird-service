/**
 * name : elastic-search-config.js
 * author : Aman Jung Karki
 * created-date : 05-Dec-2019
 * Description : Elastic search configuration file.
 */


//dependencies
const { Client : esClient } = require('@elastic/elasticsearch');
let slackClient = require("../../generics/helpers/slack-communications");

/**
 * Elastic search connection.
 * @function
 * @name connect
 * @param {Object} config All elastic search configurations.
 * @return {Object} elastic search client 
 */

var connect = function (config) {

  const elasticSearchClient = new esClient({
    node: config.host,
    maxRetries: process.env.ELASTIC_SEARCH_MAX_RETRIES,
    requestTimeout: process.env.ELASTIC_SEARCH_REQUEST_TIMEOUT,
    sniffOnStart: process.env.ELASTIC_SEARCH_SNIFF_ON_START
  });

  elasticSearchClient.ping({
  }, function (error) {
    if (error) {

      let errorMessage = 'Elasticsearch cluster is down!';
      LOGGER.error(errorMessage);
    } else {
      LOGGER.info('Elasticsearch connection established.');
    }
  });

  return {
    client: elasticSearchClient
  };

};

module.exports = connect;
