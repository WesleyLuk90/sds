import { DocumentType } from "../query/DocumentType";
import {
    DOCUMENT_TYPES_COLLECTION,
    CollectionManager
} from "../storage/CollectionManager";
import { Storage } from "../storage/Storage";

function normalize(documentType: DocumentType): DocumentType {
    return {
        id: documentType.id,
        name: documentType.name,
        fields: documentType.fields.map(f => ({
            id: f.id,
            name: f.name,
            type: f.type,
            options: f.options || []
        }))
    };
}

export default class DocumentTypeService {
    constructor(
        private storage: Storage,
        private collectionManager: CollectionManager
    ) {}

    async get(type: string): Promise<DocumentType> {
        return this.storage
            .get(DOCUMENT_TYPES_COLLECTION, type)
            .then(normalize);
    }

    async create(type: DocumentType): Promise<DocumentType> {
        return this.collectionManager.create(type).then(normalize);
    }

    async update(type: DocumentType): Promise<DocumentType> {
        return this.collectionManager.update(type).then(normalize);
    }

    async list(): Promise<DocumentType[]> {
        return this.storage
            .search<DocumentType>(DOCUMENT_TYPES_COLLECTION)
            .then(d => d.map(normalize));
    }
}
