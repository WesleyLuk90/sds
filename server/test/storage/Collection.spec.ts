import { Collection, CollectionType } from "../../src/storage/Collection";

describe("Collection", () => {
    it("should create an id", () => {
        expect(new Collection(CollectionType.SYSTEM, "abc-123").getId()).toBe(
            "system_abc-123"
        );
    });
});
