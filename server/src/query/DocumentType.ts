export const DocumentSchema = `
type DocumentType {
    id: ID!,
    name: String!,
}`;

export interface DocumentType {
    id: string;
    name: string;
}
