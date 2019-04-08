import {
    InputField,
    FieldType,
    InputDocumentType,
    InputOption
} from "../__generated__/globalTypes";
import { DocumentField } from "../system/requests/DocumentTypeRequests";

export class DocumentTypes {
    static newField(): InputField {
        return {
            id: "",
            name: "",
            type: FieldType.text,
            options: []
        };
    }

    static addField(type: InputDocumentType): InputDocumentType {
        return {
            ...type,
            fields: [...type.fields, DocumentTypes.newField()]
        };
    }

    static addOption(field: InputField): InputField {
        let biggest = field.options.reduce((i, o) => (i > o.id ? i : o.id), -1);
        return {
            ...field,
            options: [
                ...field.options,
                {
                    id: biggest + 1,
                    label: ""
                }
            ]
        };
    }

    static updateOption(
        field: InputField,
        oldOption: InputOption,
        newOption: InputOption
    ): InputField {
        return {
            ...field,
            options: field.options.map(f => {
                if (f === oldOption) {
                    return newOption;
                } else {
                    return f;
                }
            })
        };
    }
}
