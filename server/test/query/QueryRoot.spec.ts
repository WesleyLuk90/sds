import { newValue } from "../../src/documents/DefaultValue";
import { FieldType } from "../../src/query/DocumentType";
import { QueryRoot } from "../../src/query/Schema";

describe.integration("QueryRoot", () => {
    it("should create and list", async () => {
        const root = await QueryRoot.create();

        const type = await root.createDocumentType({
            documentType: {
                id: "test-type",
                name: "Test Type",
                fields: [
                    { id: "name", name: "Name", type: FieldType.TEXT },
                    { id: "test-type-id", name: "ID", type: FieldType.ID }
                ]
            }
        });

        const created = await root.createDocument({
            document: {
                id: "",
                type: type.id,
                values: [
                    newValue("name", { text: "foo" }),
                    newValue("test-type-id", { text: "bar" })
                ]
            },
            wait: true
        });
        expect(created.id).toBeTruthy();

        const found = await root.listDocuments({ type: type.id });
        expect(found).toContainEqual(created);
    });
});
