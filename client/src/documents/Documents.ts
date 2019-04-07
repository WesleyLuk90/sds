import {
    InputDocument,
    InputDocumentValue
} from "../__generated__/globalTypes";
import {
    DocumentType,
    DocumentField
} from "../system/requests/DocumentTypeRequests";

export class Documents {
    static newDocument(type: DocumentType): InputDocument {
        return {
            id: "",
            type: type.id,
            values: []
        };
    }

    static newValue(
        field: DocumentField,
        value: Partial<InputDocumentValue>
    ): InputDocumentValue {
        return {
            fieldId: field.id,
            id: "",
            text: "",
            ...value
        };
    }
}
