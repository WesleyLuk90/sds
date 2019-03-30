import { buildSchema } from "graphql";
import { DocumentSchema } from "./DocumentType";

const RootQuery = `
type Query {
    documentTypes: [DocumentType!]!
    err: [DocumentType!]!
}`;

export const Schema = buildSchema([RootQuery, DocumentSchema].join("\n"));
