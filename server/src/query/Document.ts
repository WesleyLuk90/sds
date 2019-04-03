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
}
