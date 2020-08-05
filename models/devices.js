module.exports = {
    schema : {
        fields : {
            id : "text",
            dspec : {
                type: "map",
                typeDef: "<text,text>"
            },
            channel : "text",
            fcmToken : "text",
            producer : "text",
            first_access : "bigint",
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