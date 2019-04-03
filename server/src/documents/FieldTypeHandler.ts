import { DocumentValue } from "../query/Document";
import { Field, FieldType } from "../query/DocumentType";
import { newValue } from "./DefaultValue";

interface FieldTypeImplementation {
    type: FieldType;
    defaultRawValue(): any;
    toRaw(value: DocumentValue): any;
    toValue(field: Field, raw: any): DocumentValue;
}

export class FieldTypeHandler {
    constructor(private impl: FieldTypeImplementation) {}

    serialize(value?: DocumentValue): any {
        if (value != null) {
            return this.impl.toRaw(value);
        } else {
            return this.impl.defaultRawValue();
        }
    }

    deserialize(field: Field, value?: any): DocumentValue {
        if (value != null) {
            return this.impl.toValue(field, value);
        } else {
            return newValue(field.id, {});
        }
    }
}
const types: { [fieldType: string]: FieldTypeImplementation } = {
    text: {
        type: FieldType.TEXT,
        defaultRawValue: () => "",
        toRaw: (value: DocumentValue) => value.text,
        toValue: (field, raw) => newValue(field.id, { text: raw })
    },
    id: {
        type: FieldType.ID,
        defaultRawValue: () => "",
        toRaw: (value: DocumentValue) => value.id,
        toValue: (field, raw) => newValue(field.id, { id: raw })
    }
};

export function forType(fieldType: FieldType): FieldTypeHandler {
    const impl = types[fieldType];
    if (impl == null) {
        throw new Error(`No implementation for field type ${fieldType}`);
    }
    return new FieldTypeHandler(impl);
}
