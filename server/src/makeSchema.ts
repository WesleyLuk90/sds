import { writeFileSync } from "fs";
import { graphqlSync, introspectionQuery } from "graphql";
import { join } from "path";
import { Schema } from "./query/Schema";

writeFileSync(
    join(__dirname, "../../client/graphql-schema.json"),
    JSON.stringify(graphqlSync(Schema, introspectionQuery))
);
