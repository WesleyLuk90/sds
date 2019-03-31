module.exports = {
    client: {
        includes: ["./client/src/**/*.{ts,tsx}"],
        service: {
            name: "sds",
            localSchemaFile: "./client/graphql-schema.json"
        }
    }
};
