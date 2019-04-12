import { DocumentType } from "../models/DocumentType";
import {
    Collection,
    CollectionField,
    CollectionFieldType,
    CollectionType
} from "./Collection";
import { CollectionService } from "./CollectionService";
import { Storage } from "./Storage";

export const DOCUMENT_TYPES_COLLECTION = new Collection(
    CollectionType.SYSTEM,
    "document-types"
).addField(new CollectionField(CollectionFieldType.TEXT, "name"));

export class CollectionManager {
    static async create(storage: Storage) {
        const manager = new CollectionManager(storage, new CollectionService());
        await manager.initialize();
        return manager;
    }

    constructor(
        private storage: Storage,
        private collectionService: CollectionService
    ) {}

    async get(id: string): Promise<DocumentType> {
        return await this.storage.get(DOCUMENT_TYPES_COLLECTION, id);
    }

    async initialize() {
        await this.storage.updateCollection(DOCUMENT_TYPES_COLLECTION);
    }

    async create(documentType: DocumentType) {
        const collection = this.collectionService.toCollection(documentType);
        await this.storage.create(DOCUMENT_TYPES_COLLECTION, documentType);
        await this.storage.updateCollection(collection);
        return documentType;
    }

    async update(documentType: DocumentType) {
        const collection = this.collectionService.toCollection(documentType);
        await this.storage.update(DOCUMENT_TYPES_COLLECTION, documentType);
        await this.storage.updateCollection(collection);
        return documentType;
    }
}
