module.exports = {
    schema : {
        fields : {
            id : "text",
            dspec : {
                type: "map",
                typeDef: "<varchar,varchar>"
            },
            channel : "text",
            fcmToken : "text",
            producer : "text",
            first_access : "timestamp",
            userDeclaredLocation : {
                type: "map",
                typeDef: "<text,text>"
            },
            ipLocation :  {
                type: "map",
                typeDef: "<text,text>"
            }
        },
      key : ["id"]
    },
   name : "devices",
   db_type : "cassandra"
}