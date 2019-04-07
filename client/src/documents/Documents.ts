import { InputDocument } from "../__generated__/globalTypes";
import { DocumentType } from "../system/requests/DocumentTypeRequests";

export class Documents {
    static newDocument(type: DocumentType): InputDocument {
        return {
            id: null,
            type: type.id,
            values: []
        };
    }
}
