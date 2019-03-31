module.exports = {
    client: {
        includes: ["./client/src/**/*.ts", "./client/src/**/*.tsx"],
        service: {
            localSchemaFile: "./client/graphql-schema.json"
        }
    }
};
