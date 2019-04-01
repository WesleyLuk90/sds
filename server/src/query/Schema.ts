import { buildSchema } from "graphql";
import {
    CollectionManager,
    DOCUMENT_TYPES_COLLECTION
} from "../storage/CollectionManager";
import { Storage } from "../storage/Storage";
import { DocumentSchema, DocumentType } from "./DocumentType";

const QuerySchema = `
type Query {
    documentTypes: [DocumentType!]!
    documentType(id: String!): DocumentType!
}`;

const MutationSchema = `
type Mutation {
    createDocumentType(documentType: InputDocumentType): DocumentType!
    updateDocumentType(documentType: InputDocumentType): DocumentType!
}`;

export const RawSchema = [QuerySchema, MutationSchema, DocumentSchema].join(
    "\n"
);

export const Schema = buildSchema(RawSchema);

export class QueryRoot {
    static async create() {
        const storage = await Storage.create();
        const collectionManager = await CollectionManager.create(storage);
        return new QueryRoot(storage, collectionManager);
    }

    constructor(
        private storage: Storage,
        private collectionManager: CollectionManager
    ) {}

    async documentTypes(): Promise<DocumentType[]> {
        return this.storage.search<DocumentType>(DOCUMENT_TYPES_COLLECTION);
    }

    async documentType(args: { id: string }): Promise<DocumentType> {
        return this.collectionManager.get(args.id);
    }

    async createDocumentType(args: { documentType: DocumentType }) {
        return this.collectionManager.create(args.documentType);
    }

    async updateDocumentType(args: { documentType: DocumentType }) {
        return this.collectionManager.update(args.documentType);
    }
}
