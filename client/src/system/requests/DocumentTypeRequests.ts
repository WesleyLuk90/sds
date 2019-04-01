import { gql, GraphQlClient } from "../../http/GraphQlClient";
import { InputDocumentType } from "../../__generated__/globalTypes";
import { CreateDocumentTypeVariables } from "./__generated__/CreateDocumentType";
import {
    ListDocuments,
    ListDocuments_documentTypes
} from "./__generated__/ListDocuments";

const list = gql`
    query ListDocuments {
        documentTypes {
            id
            name
        }
    }
`;

const create = gql`
    mutation CreateDocumentType($documentType: InputDocumentType!) {
        createDocumentType(documentType: $documentType) {
            id
        }
    }
`;

export type DocumentType = ListDocuments_documentTypes;

export class DocumentTypeRequests {
    static async list(): Promise<DocumentType[]> {
        const res = await GraphQlClient.query<ListDocuments>(list);
        return res.documentTypes;
    }

    static async create(documentType: InputDocumentType): Promise<void> {
        const args: CreateDocumentTypeVariables = {
            documentType
        };
        await GraphQlClient.query(create, args);
    }
}
