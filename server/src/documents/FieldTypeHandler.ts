import { DocumentValue } from "../query/Document";
import { Field, FieldType } from "../query/DocumentType";
import { newValue } from "./DefaultValue";

interface FieldTypeImplementation {
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
const types: { [key in FieldType]: FieldTypeImplementation } = {
    text: {
        defaultRawValue: () => "",
        toRaw: (value: DocumentValue) => value.text,
        toValue: (field, raw) => newValue(field.id, { text: raw })
    },
    id: {
        defaultRawValue: () => "",
        toRaw: (value: DocumentValue) => value.id,
        toValue: (field, raw) => newValue(field.id, { id: raw })
    },
    number: {
        defaultRawValue: () => 0,
        toRaw: (value: DocumentValue) => value.number,
        toValue: (field, raw) => newValue(field.id, { number: raw })
    },
    tags: {
        defaultRawValue: () => [],
        toRaw: (value: DocumentValue) => value.tags,
        toValue: (field, raw) => newValue(field.id, { tags: raw })
    },
    option: {
        defaultRawValue: () => null,
        toRaw: (value: DocumentValue) => value.option,
        toValue: (field, raw) => newValue(field.id, { option: raw })
    }
};

export function forType(fieldType: FieldType): FieldTypeHandler {
    const impl = types[fieldType];
    if (impl == null) {
        throw new Error(`No implementation for field type ${fieldType}`);
    }
    return new FieldTypeHandler(impl);
}
