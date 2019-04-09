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
            number: 0,
            tags: [],
            option: null,
            options: [],
            boolean: false,
            ...value
        };
    }

    static updateValue(
        field: DocumentField,
        value: InputDocumentValue,
        document: InputDocument
    ): InputDocument {
        const newValues = document.values.filter(v => v.fieldId !== field.id);
        newValues.push(value);

        return { ...document, values: newValues };
    }
}
