import { DocumentType, Field, FieldType } from "../query/DocumentType";
import {
    Collection,
    CollectionField,
    CollectionFieldType,
    CollectionType
} from "./Collection";
import { Storage } from "./Storage";

export const DOCUMENT_TYPES_COLLECTION = new Collection(
    CollectionType.SYSTEM,
    "document-types"
).addField(new CollectionField(CollectionFieldType.TEXT, "name"));

function convertFieldType(fieldType: FieldType): CollectionFieldType {
    switch (fieldType) {
        case FieldType.ID:
            return CollectionFieldType.KEYWORD;
        case FieldType.TEXT:
            return CollectionFieldType.TEXT;
    }
    throw new Error(`Invalid field type ${fieldType}`);
}

function toCollectionField(field: Field): CollectionField {
    return new CollectionField(convertFieldType(field.type), field.id);
}

function toCollection(documentType: DocumentType): Collection {
    return new Collection(CollectionType.USER, documentType.id).setFields(
        documentType.fields.map(toCollectionField)
    );
}

export class CollectionManager {
    static async create(storage: Storage) {
        const manager = new CollectionManager(storage);
        await manager.initialize();
        return manager;
    }

    constructor(private storage: Storage) {}

    async get(id: string): Promise<DocumentType> {
        return await this.storage.get(DOCUMENT_TYPES_COLLECTION, id);
    }

    async initialize() {
        await this.storage.updateCollection(DOCUMENT_TYPES_COLLECTION);
    }

    async create(documentType: DocumentType) {
        await this.storage.create(DOCUMENT_TYPES_COLLECTION, documentType);
        await this.storage.updateCollection(toCollection(documentType));
        return documentType;
    }

    async update(documentType: DocumentType) {
        await this.storage.update(DOCUMENT_TYPES_COLLECTION, documentType);
        await this.storage.updateCollection(toCollection(documentType));
        return documentType;
    }
}
