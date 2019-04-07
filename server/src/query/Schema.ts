import { buildSchema } from "graphql";
import { DocumentService } from "../documents/DocumentService";
import DocumentTypeService from "../documents/DocumentTypeService";
import {
    CollectionManager,
    DOCUMENT_TYPES_COLLECTION
} from "../storage/CollectionManager";
import { CollectionService } from "../storage/CollectionService";
import { Storage } from "../storage/Storage";
import { Document, DocumentSchema } from "./Document";
import { DocumentType, DocumentTypeSchema } from "./DocumentType";

const QuerySchema = `
type Query {
    getDocument(type: String!, id: String!): Document!
    listDocuments(type: String!): [Document!]!
    documentTypes: [DocumentType!]!
    documentType(id: String!): DocumentType!
}`;

const MutationSchema = `
type Mutation {
    createDocument(document: InputDocument, wait: Boolean): Document!
    updateDocument(document: InputDocument, wait: Boolean): Document!
    createDocumentType(documentType: InputDocumentType): DocumentType!
    updateDocumentType(documentType: InputDocumentType): DocumentType!
}`;

export const RawSchema = [
    QuerySchema,
    MutationSchema,
    DocumentTypeSchema,
    DocumentSchema
].join("\n");

export const Schema = buildSchema(RawSchema);

export class QueryRoot {
    static async create() {
        const storage = await Storage.create();
        const collectionManager = await CollectionManager.create(storage);
        const documentService = new DocumentService(
            storage,
            new DocumentTypeService(storage),
            new CollectionService()
        );
        return new QueryRoot(storage, collectionManager, documentService);
    }

    constructor(
        private storage: Storage,
        private collectionManager: CollectionManager,
        private documentService: DocumentService
    ) {}

    async createDocument(args: {
        document: Document;
        wait?: boolean;
    }): Promise<Document> {
        return this.documentService.create(args.document, { wait: args.wait });
    }

    async updateDocument(args: {
        document: Document;
        wait?: boolean;
    }): Promise<Document> {
        return this.documentService.update(args.document, { wait: args.wait });
    }

    async getDocument(args: { type: string; id: string }): Promise<Document> {
        return this.documentService.get(args.type, args.id);
    }

    async listDocuments(args: { type: string }): Promise<Document[]> {
        return this.documentService.list(args.type);
    }

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
