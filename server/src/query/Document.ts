export const DocumentSchema = `
type Document {
    id: ID!
    type: String!
    values: [DocumentValue!]!
}

input InputDocument {
    id: ID!
    type: String!
    values: [InputDocumentValue!]!
}

type DocumentValue {
    fieldId: ID!
    text: String!
    id: String!
    number: Float!
    tags: [String!]!
    option: Int
    options: [Int!]!
    boolean: Boolean
}

input InputDocumentValue {
    fieldId: ID!
    text: String!
    id: String!
    number: Float!
    tags: [String!]!
    option: Int
    options: [Int!]!
    boolean: Boolean!
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
    option: number | null;
    options: [number];
    boolean: boolean;
}
