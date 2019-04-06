import { gql, GraphQlClient } from "../../http/GraphQlClient";
import { InputDocumentType } from "../../__generated__/globalTypes";
import {
    CreateDocumentType,
    CreateDocumentTypeVariables
} from "./__generated__/CreateDocumentType";
import {
    GetDocumentType,
    GetDocumentTypeVariables
} from "./__generated__/GetDocumentType";
import {
    UpdateDocumentType,
    UpdateDocumentTypeVariables
} from "./__generated__/UpdateDocumentType";
import {
    ListDocumentTypes_documentTypes,
    ListDocumentTypes
} from "./__generated__/ListDocumentTypes";

export const DOCUMENT_TYPE_SCHEMA = gql`
    fragment DocumentTypeSchema on DocumentType {
        id
        name
        fields {
            id
            name
            type
        }
    }
`;

const listQuery =
    gql`
        query ListDocumentTypes {
            documentTypes {
                ...DocumentTypeSchema
            }
        }
    ` + DOCUMENT_TYPE_SCHEMA;

const createQuery =
    gql`
        mutation CreateDocumentType($documentType: InputDocumentType!) {
            createDocumentType(documentType: $documentType) {
                ...DocumentTypeSchema
            }
        }
    ` + DOCUMENT_TYPE_SCHEMA;

const updateQuery =
    gql`
        mutation UpdateDocumentType($documentType: InputDocumentType!) {
            updateDocumentType(documentType: $documentType) {
                ...DocumentTypeSchema
            }
        }
    ` + DOCUMENT_TYPE_SCHEMA;

const getQuery =
    gql`
        query GetDocumentType($id: String!) {
            documentType(id: $id) {
                ...DocumentTypeSchema
            }
        }
    ` + DOCUMENT_TYPE_SCHEMA;

export type DocumentType = ListDocumentTypes_documentTypes;

export class DocumentTypeRequests {
    static async list(): Promise<DocumentType[]> {
        const res = await GraphQlClient.query<ListDocumentTypes>(listQuery);
        return res.documentTypes;
    }

    static async get(id: string): Promise<DocumentType> {
        const args: GetDocumentTypeVariables = {
            id
        };
        const res = await GraphQlClient.query<GetDocumentType>(getQuery, args);
        return res.documentType;
    }

    static async create(
        documentType: InputDocumentType
    ): Promise<InputDocumentType> {
        const args: CreateDocumentTypeVariables = {
            documentType
        };
        const response = await GraphQlClient.query<CreateDocumentType>(
            createQuery,
            args
        );
        return response.createDocumentType;
    }

    static async update(
        documentType: InputDocumentType
    ): Promise<InputDocumentType> {
        const args: UpdateDocumentTypeVariables = {
            documentType
        };
        const response = await GraphQlClient.query<UpdateDocumentType>(
            updateQuery,
            args
        );
        return response.updateDocumentType;
    }
}
