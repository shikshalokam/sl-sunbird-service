module.exports = {
    schema : {
        fields : {
            id : "text",
            dspec : {
                type: "map",
                typeDef: "<text, text>"
            },
            channel : "text",
            fcmToken : "text",
            producer : "text",
            first_access : "bigint" 
        },
      key : ["id"]
    },
   name : "devices",
   db_type : "cassandra"
}