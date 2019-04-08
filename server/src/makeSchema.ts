import { writeFileSync } from "fs";
import { graphqlSync, introspectionQuery } from "graphql";
import { join } from "path";
import { Schema } from "./query/Schema";

const schema = graphqlSync(Schema, introspectionQuery);
if (schema.errors) {
    console.error(schema.errors);
    process.exit(1);
}
writeFileSync(
    join(__dirname, "../../client/graphql-schema.json"),
    JSON.stringify(schema)
);
