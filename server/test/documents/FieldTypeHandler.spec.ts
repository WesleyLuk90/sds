import { newValue } from "../../src/documents/DefaultValue";
import { forType } from "../../src/documents/FieldTypeHandler";
import { Field, FieldType } from "../../src/query/DocumentType";

describe("FieldTypeHandler", () => {
    const field: Field = {
        id: "fieldId",
        type: {} as any,
        name: "Field",
        options: []
    };

    const handlers = Object.keys(FieldType)
        .map(k => FieldType[k as any])
        .map(forType);

    it("should have a handler for each type", () => {
        expect(handlers.length).toEqual(Object.keys(FieldType).length);
    });

    it("should convert the default value", () => {
        handlers.forEach(h => {
            const value = newValue("fieldId", {});
            const val = h.deserialize(field, h.serialize(value));
            expect(value).toEqual(val);
        });
    });

    it("should convert null values", () => {
        handlers.forEach(h => {
            const value = newValue("fieldId", {});
            const val = h.deserialize(field, null);
            expect(value).toEqual(val);
        });
    });
});
