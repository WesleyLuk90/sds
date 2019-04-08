import {
    FieldType,
    InputDocumentType,
    InputField
} from "../__generated__/globalTypes";
import { DocumentTypes } from "../documents/DocumentTypes";

export class DocumentTypeUpdater {
    static setNameId(
        documentType: InputDocumentType,
        name: string,
        id: string
    ): InputDocumentType {
        return { ...documentType, name, id };
    }

    static addField(documentType: InputDocumentType): InputDocumentType {
        return DocumentTypes.addField(documentType);
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
                return f;
            }
        });
        return {
            ...documentType,
            fields
        };
    }
}
