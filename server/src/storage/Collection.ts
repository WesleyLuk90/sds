import { FieldValidator } from "../documents/FieldValidator";

export enum CollectionType {
    SYSTEM = "system",
    USER = "user"
}

export enum CollectionFieldType {
    KEYWORD = "keyword",
    TEXT = "text",
    LONG = "long",
    DOUBLE = "double",
    INTEGER = "integer",
    BOOLEAN = "boolean"
}

export class CollectionField {
    constructor(readonly type: CollectionFieldType, readonly id: string) {
        FieldValidator.validateId(id);
    }
}

export class Collection {
    private fields: CollectionField[] = [];

    constructor(private collection_type: CollectionType, private id: string) {
        FieldValidator.validateId(id);
    }

    getId() {
        return `${this.collection_type}_${this.id}`;
    }

    addField(field: CollectionField) {
        this.fields.push(field);
        return this;
    }

    getFields() {
        return this.fields.slice(0);
    }

    setFields(fields: CollectionField[]) {
        this.fields = fields;
        return this;
    }
}
