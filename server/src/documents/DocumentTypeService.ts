import { DocumentType } from "../query/DocumentType";
import {
    DOCUMENT_TYPES_COLLECTION,
    CollectionManager
} from "../storage/CollectionManager";
import { Storage } from "../storage/Storage";

export default class DocumentTypeService {
    constructor(
        private storage: Storage,
        private collectionManager: CollectionManager
    ) {}

    async get(type: string): Promise<DocumentType> {
        return this.storage.get(DOCUMENT_TYPES_COLLECTION, type);
    }

    async create(type: DocumentType): Promise<DocumentType> {
        return this.collectionManager.create(type);
    }

    async update(type: DocumentType): Promise<DocumentType> {
        return this.collectionManager.update(type);
    }

    async list(): Promise<DocumentType[]> {
        return this.storage.search<DocumentType>(DOCUMENT_TYPES_COLLECTION);
    }
}
