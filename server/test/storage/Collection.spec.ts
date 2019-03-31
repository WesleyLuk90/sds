import { Collection, CollectionType } from "../../src/storage/Collection";

describe("Collection", () => {
    it("should validate ids", () => {
        const invalid = [
            "abc[]123",
            "_abc-123",
            "",
            "0000",
            "ABC",
            "def_bcd",
            "id"
        ];
        invalid.forEach(id =>
            expect(
                () => new Collection(CollectionType.SYSTEM, id)
            ).toThrowError(/Invalid collection id/)
        );
        expect(
            () => new Collection(CollectionType.SYSTEM, "abc-123")
        ).not.toThrowError();
    });

    it("should create an id", () => {
        expect(new Collection(CollectionType.SYSTEM, "abc-123").getId()).toBe(
            "system_abc-123"
        );
    });
});
