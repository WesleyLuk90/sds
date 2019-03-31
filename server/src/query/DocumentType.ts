import { FieldType } from "../storage/Collection";

export const DocumentSchema = `
input InputDocumentType {
    id: ID!
    name: String!
    fields: [InputField!]!
}

input InputField {
    id: ID!
    name: String!
    type: FieldType!
}

type DocumentType {
    id: ID!
    name: String!
    fields: [Field!]!
}

type Field {
    id: ID!
    name: String!
    type: FieldType!
}

enum FieldType {
    keyword
    text
}`;

export interface Field {
    id: string;
    name: string;
    type: FieldType;
}

export interface DocumentType {
    id: string;
    name: string;
    fields: Field[];
}
