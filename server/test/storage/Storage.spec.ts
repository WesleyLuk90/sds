import {
    Collection,
    CollectionField,
    CollectionFieldType
} from "../../src/storage/Collection";
import { RawDocument, Storage } from "../../src/storage/Storage";

describe.integration("Storage", () => {
    const TEST_COLLECTION_TYPE: any = "test";
    const testCollection = new Collection(TEST_COLLECTION_TYPE, "test-foo")
        .addField(new CollectionField(CollectionFieldType.KEYWORD, "first"))
        .addField(new CollectionField(CollectionFieldType.KEYWORD, "second"));
    let storage: Storage;

    beforeEach(async () => {
        storage = await Storage.create();
        await storage.updateCollection(testCollection);
    });

    afterEach(async () => {
        await storage.deleteCollection(testCollection);
    });

    it("should exist", () => {
        expect(
            storage.collectionExists(
                new Collection(TEST_COLLECTION_TYPE, "no-exists").getId()
            )
        ).resolves.toEqual(false);
    });

    it("should create", async () => {
        expect(
            storage.collectionExists(testCollection.getId())
        ).resolves.toEqual(true);
    });

    it("should update schema", async () => {
        const updated = new Collection(TEST_COLLECTION_TYPE, "test-foo")
            .addField(new CollectionField(CollectionFieldType.KEYWORD, "first"))
            .addField(
                new CollectionField(CollectionFieldType.KEYWORD, "third")
            );
        await storage.updateCollection(updated);

        const updatedMappings = await storage.client.indices.getMapping({
            index: testCollection.getId(),
            type: "_doc"
        });
        const fields =
            updatedMappings.body[testCollection.getId()].mappings._doc
                .properties;
        expect(Object.keys(fields)).toEqual(["first", "second", "third"]);
    });

    it("should create document with generated id", async () => {
        const document = {
            id: null,
            first: "hello"
        } as RawDocument;
        const created = await storage.create(testCollection, document, {
            block: true
        });

        expect(created).toBe(document);
        expect(created.id).toBeTruthy();

        expect(await storage.search(testCollection)).toEqual([
            { id: created.id, first: "hello" }
        ]);
    });

    it("should get document with generated id", async () => {
        const document = {
            id: null,
            first: "hello"
        } as RawDocument;
        const created = await storage.create(testCollection, document);
        try {
            await storage.get(testCollection, created.id!);
        } catch (e) {
            console.error(e);
        }
        expect(await storage.get(testCollection, created.id!)).toEqual(created);
    });

    it("should fail on duplicate", async () => {
        const document = {
            id: "foo",
            first: "hello"
        } as RawDocument;
        await storage.create(testCollection, document, {
            block: true
        });
        expect(
            storage.create(testCollection, document, {
                block: true
            })
        ).rejects.toThrowError("Duplicate id");
    });

    it("should update document", async () => {
        const document = {
            id: "foo",
            first: "hello"
        };
        await storage.create(testCollection, document, {
            block: true
        });
        document.first = "world";
        await storage.update(testCollection, document, {
            block: true
        });
        const list = await storage.search(testCollection);
        expect(list).toEqual([{ id: "foo", first: "world" }]);
    });
});
