import { Collection } from "./Collection";
import { RawDocument, Storage } from "./Storage";

interface Storable {
    id: string;
}

export class StorageService<T extends Storable> {
    constructor(private collection: Collection, private storage: Storage) {}

    async initialize() {
        await this.storage.updateCollection(this.collection);
    }

    async get(id: string): Promise<T> {
        const docs = await this.storage.get(this.collection, id);
        return docs as T;
    }

    async list(): Promise<T[]> {
        const docs = await this.storage.search(this.collection);
        return docs as T[];
    }

    async create(document: T): Promise<T> {
        const doc: RawDocument = document;
        delete doc.id;
        const created = await this.storage.create(this.collection, doc);
        return created as T;
    }

    async update(document: T): Promise<T> {
        const doc: RawDocument = document;
        await this.storage.update(this.collection, doc);
        return document;
    }
}
