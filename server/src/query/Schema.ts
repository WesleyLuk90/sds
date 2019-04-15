import { buildSchema } from "graphql";
import { DocumentService } from "../documents/DocumentService";
import DocumentTypeService from "../documents/DocumentTypeService";
import { Document, DocumentSchema } from "../models/Document";
import { DocumentType, DocumentTypeSchema } from "../models/DocumentType";
import { PageSchema } from "../models/Page";
import { PanelSchema } from "../models/Panel";
import { PanelService } from "../pages/PanelService";
import { CollectionManager } from "../storage/CollectionManager";
import { CollectionService } from "../storage/CollectionService";
import { Storage } from "../storage/Storage";

const QuerySchema = `
type Query {
    document(type: String!, id: String!): Document!
    documents(type: String!): [Document!]!
    documentTypes: [DocumentType!]!
    documentType(id: String!): DocumentType!
    pages: Page!
    page(id: String!): Page!
}`;

const MutationSchema = `
type Mutation {
    createDocument(document: InputDocument, wait: Boolean): Document!
    updateDocument(document: InputDocument, wait: Boolean): Document!
    createDocumentType(documentType: InputDocumentType): DocumentType!
    updateDocumentType(documentType: InputDocumentType): DocumentType!
    createPage(page: InputPage!): Page!
    updatePage(page: InputPage!): Page!
}`;

export const RawSchema = [
    QuerySchema,
    MutationSchema,
    DocumentTypeSchema,
    DocumentSchema,
    PanelSchema,
    PageSchema
].join("\n");

export const Schema = buildSchema(RawSchema);

export class QueryRoot {
    static async create() {
        const storage = await Storage.create();
        const collectionManager = await CollectionManager.create(storage);
        const typeService = new DocumentTypeService(storage, collectionManager);
        const documentService = new DocumentService(
            storage,
            typeService,
            new CollectionService()
        );
        const panelService = await PanelService.create(storage);
        return new QueryRoot(typeService, documentService, panelService);
    }

    constructor(
        private documentTypeService: DocumentTypeService,
        private documentService: DocumentService,
        private panelService: PanelService
    ) {}

    async document(args: { type: string; id: string }): Promise<Document> {
        return this.documentService.get(args.type, args.id);
    }

    async documents(args: { type: string }): Promise<Document[]> {
        return this.documentService.list(args.type);
    }

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

    async documentType(args: { id: string }): Promise<DocumentType> {
        return this.documentTypeService.get(args.id);
    }

    async documentTypes(): Promise<DocumentType[]> {
        return this.documentTypeService.list();
    }

    async createDocumentType(args: { documentType: DocumentType }) {
        return this.documentTypeService.create(args.documentType);
    }

    async updateDocumentType(args: { documentType: DocumentType }) {
        return this.documentTypeService.update(args.documentType);
    }
}
