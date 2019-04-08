import { DocumentValue } from "../query/Document";

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
            tags: []
        },
        values
    );
}
