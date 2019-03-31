module.exports = {
    client: {
        includes: ["./client/src/**/*.ts"],
        service: {
            localSchemaFile: "./client/graphql-schema.json"
        }
    }
};
