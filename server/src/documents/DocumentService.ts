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

    async create(
        document: Document,
        options: { wait?: boolean }
    ): Promise<Document> {
        const type = await this.documentTypeService.get(document.type);
        const raw = DocumentSerializer.serialize(type, document);
        const collection = this.collectionService.toCollection(type);
        const created = await this.storage.create(collection, raw, {
            block: !!options.wait
        });
        return DocumentSerializer.deserialize(type, created);
    }

    async list(typeId: string): Promise<Document[]> {
        const documentType = await this.documentTypeService.get(typeId);
        const collection = this.collectionService.toCollection(documentType);
        const results = await this.storage.search(collection);
        return results.map(r =>
            DocumentSerializer.deserialize(documentType, r)
        );
    }
}
