import {
    InputDocumentType,
    FieldType,
    InputDocument
} from "../../src/__generated__/globalTypes";
import { Documents } from "../../src/documents/Documents";
import {
    DocumentType,
    DocumentField
} from "../../src/system/requests/DocumentTypeRequests";

describe("Documents", () => {
    const field1: DocumentField = {
        __typename: "Field",
        id: "f1",
        name: "Field 1",
        type: FieldType.text,
        options: []
    };
    const field2: DocumentField = {
        __typename: "Field",
        id: "f2",
        name: "Field 2",
        type: FieldType.text,
        options: []
    };
    const type: DocumentType = {
        __typename: "DocumentType",
        id: "type",
        name: "Docs",
        fields: [field1, field2]
    };

    it("should create a new document", () => {
        const doc = Documents.newDocument(type);

        expect(doc).toEqual({
            id: "",
            type: "type",
            values: []
        });
    });

    it("should create a new value", () => {
        const value = Documents.newValue(field1, { text: "foo" });

        expect(value.text).toEqual("foo");
    });

    it("should update a document values", () => {
        const document: InputDocument = {
            id: "",
            type: "doc",
            values: [
                Documents.newValue(field1, { text: "value 1" }),
                Documents.newValue(field2, { text: "value 2" })
            ]
        };
        const updated = Documents.updateValue(
            field1,
            Documents.newValue(field1, { text: "new value 1" }),
            document
        );

        expect(updated.values).toEqual([
            Documents.newValue(field2, { text: "value 2" }),
            Documents.newValue(field1, { text: "new value 1" })
        ]);
    });

    it("should add a new document values", () => {
        const document: InputDocument = {
            id: "",
            type: "doc",
            values: [Documents.newValue(field2, { text: "value 2" })]
        };
        const updated = Documents.updateValue(
            field1,
            Documents.newValue(field1, { text: "new value 1" }),
            document
        );

        expect(updated.values).toEqual([
            Documents.newValue(field2, { text: "value 2" }),
            Documents.newValue(field1, { text: "new value 1" })
        ]);
    });
});
