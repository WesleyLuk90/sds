import { gql, GraphQlClient } from "../../http/GraphQlClient";
import { DOCUMENT_TYPE_SCHEMA, DocumentType } from "./DocumentTypeRequests";
import { InputDocument } from "../../__generated__/globalTypes";
import {
    ListDocuments,
    ListDocumentsVariables,
    ListDocuments_listDocuments
} from "./__generated__/ListDocuments";

const listQuery =
    gql`
        query ListDocuments($type: String!) {
            listDocuments(type: $type) {
                id
                type
                values {
                    fieldId
                    text
                    id
                }
            }
            documentType(id: $type) {
                ...DocumentTypeSchema
            }
        }
    ` + DOCUMENT_TYPE_SCHEMA;

const create = gql`
    mutation CreateDocument($document: InputDocument!) {
        createDocument(document: $document) {
            id
            type
            values {
                fieldId
                text
                id
            }
        }
    }
`;

type Document = ListDocuments_listDocuments;

export class DocumentRequests {
    async list(
        type: string
    ): Promise<{ documents: Document[]; type: DocumentType }> {
        const args: ListDocumentsVariables = {
            type
        };
        const res = await GraphQlClient.query<ListDocuments>(listQuery, args);
        return {
            documents: res.listDocuments,
            type: res.documentType
        };
    }
}
