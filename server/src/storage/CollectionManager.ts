import { Collection, CollectionType, Field, FieldType } from "./Collection";
import { Storage } from "./Storage";

const DOCUMENT_TYPES_COLLECTION = new Collection(
    CollectionType.SYSTEM,
    "document-types"
).addField(new Field(FieldType));

export class CollectionManager {
    constructor(private storage: Storage) {}

    async initialize() {}

    async sync(collection: Collection) {
        if (!(await this.storage.collectionExists(collection.getId()))) {
            await this.storage.createCollection("system_document-types");
        }
    }
}
