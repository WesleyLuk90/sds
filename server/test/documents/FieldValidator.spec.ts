import { FieldValidator } from "../../src/documents/FieldValidator";

describe("FieldValidator", () => {
    it("should validate ids", () => {
        expect(() => FieldValidator.validateId("")).toThrowError(
            /ID must not be empty/
        );
        const invalid = [
            "abc[]123",
            "_abc-123",
            "0000",
            "ABC",
            "def_bcd",
            "id"
        ];
        invalid.forEach(id =>
            expect(() => FieldValidator.validateId(id)).toThrowError(
                /Invalid ID/
            )
        );
        expect(() => FieldValidator.validateId("abc-123")).not.toThrowError();
    });
});
