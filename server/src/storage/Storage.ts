import { Client } from "@elastic/elasticsearch";
import { Collection } from "./Collection";

export interface Document {
    id?: string;
}

interface Options {
    block: boolean;
}

const DEFAULT_OPTIONS: Options = {
    block: false
};

function mapError(
    e: { body?: { error?: { type?: string } } },
    type: string,
    newError: Error
) {
    if (e.body && e.body.error && e.body.error.type === type) {
        throw newError;
    }
    throw e;
}

export class Storage {
    static async create() {
        const storage = new Storage(
            new Client({ node: "http://localhost:9200" })
        );
        return storage;
    }

    constructor(public client: Client) {}

    async collectionExists(id: string): Promise<boolean> {
        return (await this.client.indices.exists({ index: id })).body;
    }

    async createCollection(id: string): Promise<void> {
        await this.client.indices.create({
            index: id
        });
    }

    async updateCollection(collection: Collection): Promise<void> {
        if (!(await this.collectionExists(collection.getId()))) {
            await this.createCollection(collection.getId());
        }
        const schema: { [id: string]: { type: string } } = {};
        collection.getFields().forEach(f => {
            schema[f.id] = { type: f.type };
        });
        await this.client.indices.putMapping({
            index: collection.getId(),
            type: "_doc",
            body: {
                properties: schema
            }
        });
    }

    async deleteCollection(collection: Collection): Promise<void> {
        await this.client.indices.delete({ index: collection.getId() });
    }

    async create(
        collection: Collection,
        document: Document,
        options: Options = DEFAULT_OPTIONS
    ): Promise<Document> {
        try {
            const request = await this.client.index({
                index: collection.getId(),
                id: document.id,
                type: "_doc",
                body: document,
                refresh: options.block ? "wait_for" : "false"
            });
            document.id = request.body._id;
            return document;
        } catch (e) {
            mapError(e, "index_not_found_exception", new Error("Duplicate id"));
        }
    }

    async update(
        collection: Collection,
        document: Document,
        options: Options = DEFAULT_OPTIONS
    ) {
        await this.client.update({
            index: collection.getId(),
            id: document.id,
            type: "_doc",
            body: {
                doc: document
            },
            refresh: options.block ? "wait_for" : "false"
        });
    }

    async search<T extends Document>(collection: Collection): Promise<T[]> {
        const results = await this.client.search({
            index: collection.getId(),
            type: "_doc"
        });
        return results.body.hits.hits.map((d: any) => ({
            ...d._source,
            id: d._id
        }));
    }
}
