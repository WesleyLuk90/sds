export class DocumentTypesStorage {
    constructor(private storage: Storage) {}

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
