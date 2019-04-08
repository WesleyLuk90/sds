import { FieldType } from "./DocumentType";

export const DocumentSchema = `
type Document {
    id: ID!
    type: String!
    values: [DocumentValue!]!
}

type DocumentValue {
    fieldId: ID!
    text: String!
    id: String!
    number: Float!
    tags: [String!]!
}

input InputDocument {
    id: ID!
    type: String!
    values: [InputDocumentValue!]!
}

input InputDocumentValue {
    fieldId: ID!
    text: String!
    id: String!
    number: Float!
    tags: [String!]!
}
`;

export interface Document {
    id: string;
    type: string;
    values: DocumentValue[];
}

export interface DocumentValue {
    fieldId: string;
    text: string;
    id: string;
    number: number;
    tags: string[];
}
