import { Document } from "../query/Document";
import { CollectionService } from "../storage/CollectionService";
import { Storage } from "../storage/Storage";
import { DocumentSerializer } from "./DocumentSerializer";
import DocumentTypeService from "./DocumentTypeService";

export class DocumentService {
    constructor(
        private storage: Storage,
        private documentTypeService: DocumentTypeService,
        private collectionService: CollectionService
    ) {}

    async create(document: Document): Promise<Document> {
        const type = await this.documentTypeService.get(document.type);
        const raw = DocumentSerializer.serialize(type, document);
        const collection = this.collectionService.toCollection(type);
        const created = await this.storage.create(collection, raw);
        return DocumentSerializer.deserialize(type, created);
    }
}
