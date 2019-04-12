import { DocumentValue } from "../models/Document";

export function newValue(
    fieldId: string,
    values: Partial<DocumentValue>
): DocumentValue {
    return Object.assign(
        {
            fieldId,
            text: "",
            id: "",
            number: 0,
            tags: [],
            option: null,
            options: [],
            boolean: false
        },
        values
    );
}
