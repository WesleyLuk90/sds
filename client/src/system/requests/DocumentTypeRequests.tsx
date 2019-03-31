import { gql, GraphQlClient } from "../../http/GraphQlClient";
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

export type DocumentType = ListDocuments_documentTypes;

export class DocumentTypeRequests {
    static async list(): Promise<DocumentType[]> {
        const res = await GraphQlClient.query<ListDocuments>(list);
        return res.documentTypes;
    }
}
