module.exports = {
  async up(db) {
    global.migrationMsg = "Update elastic search index mapping of bodh content.";

    if(!es) {
      throw new Error("Elastic search connection not available.");
    }

    if(!process.env.ELASTICSEARCH_BODH_CONTENT_INDEX || process.env.ELASTICSEARCH_BODH_CONTENT_INDEX == "") {
      throw new Error("Invalid bodh content index name.");
    }

    const indexName = process.env.ELASTICSEARCH_BODH_CONTENT_INDEX;


    const checkIfIndexExists = await es.indices.exists({ index: indexName});

    if(checkIfIndexExists.statusCode === 200) {
      const deleteIndex = await es.indices.delete({ index: indexName});
      if(deleteIndex.statusCode != 200) {
        throw new Error("Error while deleting bodh content index.");
      }
    }

    const createIndex = await es.indices.create({ index: indexName});

    if(createIndex.statusCode != 200) {
      throw new Error("Error while creating bodh content index.")
    }

    const putMapping = await es.indices.putMapping({
      index: indexName,
      body: {
        properties: {
            suggest: {
                type : "completion",
                contexts: [
                    { 
                      "name": "isACourse",
                      "type": "category"
                    }
                ]
            }
        }
      }
    });

    if(putMapping.statusCode != 200) {
      throw new Error("Error while updating mapping for bodh content index.");
    }

    return global.migrationMsg
  },

  async down(db) {
  }
};
