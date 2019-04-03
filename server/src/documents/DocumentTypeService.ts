import { DocumentType } from "../query/DocumentType";
import { DOCUMENT_TYPES_COLLECTION } from "../storage/CollectionManager";
import { Storage } from "../storage/Storage";

export default class DocumentTypeService {
    constructor(private storage: Storage) {}

    async get(type: string): Promise<DocumentType> {
        return this.storage.get(DOCUMENT_TYPES_COLLECTION, type);
    }
}
