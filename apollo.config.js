module.exports = {
    client: {
        includes: ["client/src/**/*.ts", "client/src/**/*.tsx"],
        service: {
            name: "sds",
            localSchemaFile: "./client/graphql-schema.json"
        }
    }
};
