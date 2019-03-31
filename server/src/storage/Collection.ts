export enum CollectionType {
    SYSTEM = "system",
    USER = "user"
}

export enum FieldType {
    KEYWORD = "keyword",
    TEXT = "text"
}

export class Field {
    constructor(readonly type: FieldType, readonly id: string) {
        if (!ID_REGEX.test(id)) {
            throw new Error(`Invalid field id ${id}`);
        }
    }
}

const ID_REGEX = /^[a-z][a-z0-9-]{3,}$/;

export class Collection {
    private fields: Field[] = [];

    constructor(private collection_type: CollectionType, private id: string) {
        if (!ID_REGEX.test(id)) {
            throw new Error(`Invalid collection id ${id}`);
        }
    }

    getId() {
        return `${this.collection_type}_${this.id}`;
    }

    addField(field: Field) {
        this.fields.push(field);
        return this;
    }

    getFields() {
        return this.fields.slice(0);
    }
}
