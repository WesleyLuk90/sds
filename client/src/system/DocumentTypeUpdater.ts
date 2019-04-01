import {
    FieldType,
    InputDocumentType,
    InputField
} from "../__generated__/globalTypes";

export class DocumentTypeUpdater {
    static setId(
        documentType: InputDocumentType,
        id: string
    ): InputDocumentType {
        return { ...documentType, id };
    }

    static setName(
        documentType: InputDocumentType,
        name: string
    ): InputDocumentType {
        return { ...documentType, name };
    }

    static addField(documentType: InputDocumentType): InputDocumentType {
        return {
            ...documentType,
            fields: [
                ...documentType.fields,
                { id: "", name: "", type: FieldType.text }
            ]
        };
    }

    static updateField(
        documentType: InputDocumentType,
        oldField: InputField,
        newField: InputField
    ): InputDocumentType {
        if (!documentType.fields.includes(oldField)) {
            throw new Error("Old field not in document");
        }
        const fields = documentType.fields.map(f => {
            if (f === oldField) {
                return newField;
            } else {
                return oldField;
            }
        });
        return {
            ...documentType,
            fields
        };
    }
}
