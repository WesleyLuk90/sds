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
    ListDocuments,
    ListDocuments_documentTypes
} from "./__generated__/ListDocuments";
import {
    UpdateDocumentType,
    UpdateDocumentTypeVariables
} from "./__generated__/UpdateDocumentType";

const listQuery = gql`
    query ListDocuments {
        documentTypes {
            id
            name
            fields {
                id
                name
                type
            }
        }
    }
`;

const createQuery = gql`
    mutation CreateDocumentType($documentType: InputDocumentType!) {
        createDocumentType(documentType: $documentType) {
            id
            name
            fields {
                id
                name
                type
            }
        }
    }
`;

const updateQuery = gql`
    mutation UpdateDocumentType($documentType: InputDocumentType!) {
        updateDocumentType(documentType: $documentType) {
            id
            name
            fields {
                id
                name
                type
            }
        }
    }
`;

const getQuery = gql`
    query GetDocumentType($id: String!) {
        documentType(id: $id) {
            id
            name
            fields {
                id
                name
                type
            }
        }
    }
`;

export type DocumentType = ListDocuments_documentTypes;

export class DocumentTypeRequests {
    static async list(): Promise<DocumentType[]> {
        const res = await GraphQlClient.query<ListDocuments>(listQuery);
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
