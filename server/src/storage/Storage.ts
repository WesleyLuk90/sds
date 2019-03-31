import { Client } from "@elastic/elasticsearch";
import { DocumentType } from "../query/DocumentType";

export class Storage {
    static async create() {
        const storage = new Storage(
            new Client({ node: "http://localhost:9200" })
        );
        await storage.migrate();
        return storage;
    }

    constructor(private client: Client) {}

    async indexExists(name: string): Promise<boolean> {
        return (await this.client.indices.exists({ index: name })).body;
    }

    async migrate() {
        if (!(await this.indexExists("system_document-types"))) {
            await this.client.indices.create({
                index: "system_document-types"
            });
        }
        await this.client.indices.putMapping({
            index: "system_document-types",
            type: "_doc",
            body: {
                properties: {
                    label: { type: "text" }
                }
            }
        });
    }

    async documentTypes(): Promise<DocumentType[]> {
        const results = await this.client.search({
            index: "system_document-types",
            type: "_doc"
        });
        return results.body.hits.hits.map((d: any) => ({
            ...d._source,
            id: d._id
        }));
    }

    async createDocumentType(documentType: DocumentType): Promise<void> {
        await this.client.create({
            index: "system_document-types",
            id: documentType.id,
            type: "_doc",
            body: {
                name: documentType.name
            }
        });
    }
}
