import { newValue } from "../../src/documents/DefaultValue";
import { DocumentSerializer } from "../../src/documents/DocumentSerializer";
import { Document } from "../../src/query/Document";
import { DocumentType, FieldType } from "../../src/query/DocumentType";

describe("DocumentSerializer", () => {
    const documentType: DocumentType = {
        id: "student",
        name: "Student",
        fields: [
            {
                id: "student-id",
                name: "Student ID",
                type: FieldType.ID
            },
            {
                id: "name",
                name: "Name",
                type: FieldType.TEXT
            }
        ]
    };

    it("should serialize documents", () => {
        const document: Document = {
            id: "abc-123",
            type: "student",
            values: [
                newValue("student-id", { id: "10" }),
                newValue("student-id", { id: "20" }),
                newValue("name", { text: "Bob", id: "20" }),
                newValue("extra-value", { text: "secret" })
            ]
        };
        const serialized = DocumentSerializer.serialize(documentType, document);
        expect(serialized).toEqual({
            id: "abc-123",
            "student-id": "10",
            name: "Bob"
        });
    });

    it("should fill defaults documents", () => {
        const document: Document = {
            id: "abc-123",
            type: "student",
            values: []
        };
        const serialized = DocumentSerializer.serialize(documentType, document);
        expect(serialized).toEqual({
            id: "abc-123",
            "student-id": "",
            name: ""
        });
    });
});
