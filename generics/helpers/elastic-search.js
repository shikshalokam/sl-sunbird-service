/**
 * name : elastic-search.js
 * author : Aman Jung Karki
 * created-date : 05-Dec-2019
 * Description : elastic search common functionality
 */

/**
  * Create Or Update Operation.
  * @function
  * @name createOrUpdateDocumentInIndex
  * @param {String} id - (Non - Mandatory) Document ID.
  * @param {String} index - Index from which document is to deleted
  * @param {Object} data - Document Data to be created.
  * @returns {Promise} returns a promise.
*/

var createOrUpdateDocumentInIndex = function (index = "", id = "", data = "") {

  return new Promise(async function (resolve, reject) {
    try {

      if (index == "") {
        throw new Error("Index is required");
      }

      if (id == "") {
        throw new Error("ID is required");
      }

      if (Object.keys(data).length == 0) {
        throw new Error("Data is required");
      }
      
      let documentObject = {
        id: id,
        index: index,
        body: {
          doc : data,
          doc_as_upsert : true,
        },
        refresh : true
      }

      let result = await elasticsearch.client.update(documentObject);

      return resolve(result);

    } catch (error) {
      return reject(error);
    }
  })
};

/**
  * Check for index exists or not.
  * @function
  * @name _indexMappingExistOrNot
  * @param {String} index - name of the index for elastic search.
  * @returns {Promise} returns a promise.
*/

var _indexMappingExistOrNot = function (index) {

  return new Promise(async function (resolve, reject) {
    try {

      if (!index) {
        throw "index is required";
      }

      let result = await elasticsearch.client.indices.getMapping({
        index: index
      });

      return resolve(result);

    } catch (error) {
      return reject(error);
    }
  })
};


/**
  * Search document from Index by query string.
  * @function
  * @name searchDocumentFromIndex
  * @param {String} index - Index from which document is to deleted
  * @param {Object} queryObject - Query in the Lucene query string syntax
  * @param {Int} page - Page No.
  * @param {Int} size - No. of documents to return
  * @returns {Promise} returns a promise.
*/

var searchDocumentFromIndex = function (index = "", queryObject = "", page = 1, size = 10) {

  return new Promise(async function (resolve, reject) {
    try {

      if (index == "") {
        throw new Error("Index is required");
      }

      if (Object.keys(queryObject).length == 0) {
        throw new Error("Query Object is required");
      }
      
      let documentObject = {
        index: index,
        body: queryObject,
        size : size
      }

      let result = await elasticsearch.client.search(documentObject);

      let searchDocuments = [];

      if (result.statusCode === HTTP_STATUS_CODE["ok"].status && result.body.hits.hits.length > 0) {

        result.body.hits.hits.forEach(eachResultData => {
          searchDocuments.push(_.merge({ id: eachResultData._id }, eachResultData._source));
        })

      } else if (result.statusCode === HTTP_STATUS_CODE["ok"].status && Object.keys(result.body.suggest).length > 0) {
        searchDocuments = result.body.suggest;
      } else {
        throw new Error("Failed to get search results from index.")
      }

      return resolve(searchDocuments);

    } catch (error) {
      return reject(error);
    }
  })
};


/**
  *  Check if index exists in elastic search.
  * @function
  * @name getIndexMapping
  * @returns {Promise} returns a promise.
*/

var getIndexMapping = function (indexName = "") {
  return new Promise(async function (resolve, reject) {
    try {

      if(indexName == "") {
        throw new Error("Invalid index name.");
      }

      if (!elasticsearch.client) {
        throw new Error("Elastic search is down.");
      }

      const checkIndexMappingExistsOrNot = 
      await _indexMappingExistOrNot(indexName);

      return resolve(checkIndexMappingExistsOrNot);

    } catch (error) {
      return reject(error);
    }
  })
};

/**
  * Set index mapping.
  * @function
  * @name setIndexMapping
  * @param {String} index - name of the index for elastic search.
  * @param {Object} mapping - mapping for elastic search. 
  * @returns {Promise} returns a promise.
*/

var setIndexMapping = function (index = "",mapping) {

  return new Promise(async function (resolve, reject) {
    try {

      if (index == "") {
        throw new Error("Index is required");
      }


    const putMapping = await elasticsearch.client.indices.putMapping({
      index: index,
      body: mapping
    });

    if(putMapping.statusCode != 200) {
      throw new Error("Error while updating mapping for index.");
    }
    
    return resolve(putMapping);

    } catch (error) {
      return reject(error);
    }
  })
};


/**
  * Create index.
  * @function
  * @name createIndex
  * @param {String} index - name of the index for elastic search.
  * @returns {Promise} returns a promise.
*/

var createIndex = function (index = "") {

  return new Promise(async function (resolve, reject) {
    try {

      if (index == "") {
        throw new Error("Index is required");
      }
      
      const createIndex = await elasticsearch.client.indices.create({ index: index});

      if(createIndex.statusCode != 200) {
        throw new Error("Error while creating bodh content index.")
      }
    
      return resolve(createIndex);

    } catch (error) {
      return reject(error);
    }
  })
};

/**
  * Delete document from Index by ID or Query string.
  * @function
  * @name deleteDocumentFromIndex
  * @param {String} index - Index from which document is to deleted
  * @param {String} id - Document ID to deleted
  * @param {Object} queryObject - Query in the Lucene query string syntax
  * @returns {Promise} returns a promise.
*/

var deleteDocumentFromIndex = function (index = "", id = "", queryObject = "") {

  return new Promise(async function (resolve, reject) {
    try {

      if (index == "") {
        throw new Error("Index is required");
      }

      if (id == "" && Object.keys(queryObject).length == 0) {
        throw new Error("Document ID or Query Object is required");
      }
      
      let result = null;
      
      if(id && id != "") {
        result = await elasticsearch.client.delete({
          id: id,
          index: index,
          refresh : true
        });
      } else if(Object.keys(queryObject).length > 0) {
        result = await elasticsearch.client.deleteByQuery({
          body : {
            query: {
              match : queryObject
            }
          },
          index: index,
          refresh : true
        });
      }

      return resolve(result);

    } catch (error) {
      return reject(error);
    }
  })
};

module.exports = {
  getIndexMapping : getIndexMapping,
  createOrUpdateDocumentInIndex : createOrUpdateDocumentInIndex,
  searchDocumentFromIndex : searchDocumentFromIndex,
  createIndex : createIndex,
  setIndexMapping : setIndexMapping,
  deleteDocumentFromIndex : deleteDocumentFromIndex
};