export const DocumentTypeSchema = `
input InputDocumentType {
    id: ID!
    name: String!
    fields: [InputField!]!
}

type DocumentType {
    id: ID!
    name: String!
    fields: [Field!]!
}

input InputField {
    id: ID!
    name: String!
    type: FieldType!
    options: [InputOption!]!
}

type Field {
    id: ID!
    name: String!
    type: FieldType!
    options: [Option!]!
}

type Option {
    id: Int!
    label: String!
}

input InputOption {
    id: Int!
    label: String!
}

enum FieldType {
    text
    id
    number
    tags
    option
    options
    boolean
}`;

export interface Option {
    id: number;
    label: string;
}

export interface Field {
    id: string;
    name: string;
    type: FieldType;
    options: Option[];
}

export interface DocumentType {
    id: string;
    name: string;
    fields: Field[];
}

export enum FieldType {
    TEXT = "text",
    ID = "id",
    NUMBER = "number",
    TAGS = "tags",
    OPTION = "option",
    OPTIONS = "options",
    BOOLEAN = "boolean"
}
