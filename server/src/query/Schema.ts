import { buildSchema } from "graphql";
import { Storage } from "../storage/Storage";
import { DocumentSchema, DocumentType } from "./DocumentType";

const RootQuery = `
type Query {
    documentTypes: [DocumentType!]!
    err: [DocumentType!]!
}`;

export const Schema = buildSchema([RootQuery, DocumentSchema].join("\n"));

export class QueryRoot {
    static async create() {
        return new QueryRoot(await Storage.create());
    }

    constructor(private storage: Storage) {}

    async documentTypes(): Promise<DocumentType[]> {
        try {
            // await this.storage.createDocumentType({
            //     id: "people",
            //     name: "People"
            // });
            const val = await this.storage.documentTypes();
            console.log(val);
            return val;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}
