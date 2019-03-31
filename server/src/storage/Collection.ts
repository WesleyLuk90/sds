export enum CollectionType {
    SYSTEM = "system",
    USER = "user"
}

export class Collection {
    constructor(private collection_type: CollectionType, private id: string) {
        if (!/^[a-z][a-z0-9-]*$/.test(id)) {
            throw new Error(`Invalid collection id ${id}`);
        }
    }
}
