export const DocumentSchema = `
type DocumentType {
    id: ID!,
    name: String!,
}`;

export interface Document {
    id: string;
    name: string;
}
