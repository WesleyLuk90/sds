module.exports = {
    client: {
        includes: ["./client/src/**/*.ts"],
        addTypename: false,
        service: {
            localSchemaFile: "./client/graphql-schema.json"
        }
    }
};
