import { gql, GraphQlClient } from "../../http/GraphQlClient";
import { DOCUMENT_TYPE_SCHEMA, DocumentType } from "./DocumentTypeRequests";
import { InputDocument } from "../../__generated__/globalTypes";
import {
    ListDocuments,
    ListDocumentsVariables,
    ListDocuments_documents
} from "./__generated__/ListDocuments";
import {
    CreateDocument,
    CreateDocumentVariables
} from "./__generated__/CreateDocument";
import { GetDocumentVariables, GetDocument } from "./__generated__/GetDocument";
import {
    UpdateDocumentVariables,
    UpdateDocument
} from "./__generated__/UpdateDocument";

export const DOCUMENT_SCHEMA = gql`
    fragment DocumentSchema on Document {
        id
        type
        values {
            fieldId
            text
            id
            number
            tags
            option
            options
            boolean
        }
    }
`;

const listQuery =
    gql`
        query ListDocuments($type: String!) {
            documents(type: $type) {
                ...DocumentSchema
            }
            documentType(id: $type) {
                ...DocumentTypeSchema
            }
        }
    ` +
    DOCUMENT_TYPE_SCHEMA +
    DOCUMENT_SCHEMA;

const createQuery =
    gql`
        mutation CreateDocument($document: InputDocument!) {
            createDocument(document: $document) {
                ...DocumentSchema
            }
        }
    ` + DOCUMENT_SCHEMA;

const updateQuery =
    gql`
        mutation UpdateDocument($document: InputDocument!) {
            updateDocument(document: $document) {
                ...DocumentSchema
            }
        }
    ` + DOCUMENT_SCHEMA;

const getQuery =
    gql`
        query GetDocument($type: String!, $id: String!) {
            document(type: $type, id: $id) {
                ...DocumentSchema
            }
            documentType(id: $type) {
                ...DocumentTypeSchema
            }
        }
    ` +
    DOCUMENT_TYPE_SCHEMA +
    DOCUMENT_SCHEMA;

export type Document = ListDocuments_documents;

export class DocumentRequests {
    static async create(document: InputDocument): Promise<Document> {
        const args: CreateDocumentVariables = {
            document
        };
        const res = await GraphQlClient.query<CreateDocument>(
            createQuery,
            args
        );
        return res.createDocument;
    }

    static async update(document: InputDocument): Promise<Document> {
        const args: UpdateDocumentVariables = {
            document
        };
        const res = await GraphQlClient.query<UpdateDocument>(
            updateQuery,
            args
        );
        return res.updateDocument;
    }

    static async list(
        type: string
    ): Promise<{ documents: Document[]; type: DocumentType }> {
        const args: ListDocumentsVariables = {
            type
        };
        const res = await GraphQlClient.query<ListDocuments>(listQuery, args);
        return {
            documents: res.documents,
            type: res.documentType
        };
    }

    static async get(
        type: string,
        id: string
    ): Promise<{ document: Document; type: DocumentType }> {
        const args: GetDocumentVariables = {
            type,
            id
        };
        const res = await GraphQlClient.query<GetDocument>(getQuery, args);
        return {
            document: res.document,
            type: res.documentType
        };
    }
}
