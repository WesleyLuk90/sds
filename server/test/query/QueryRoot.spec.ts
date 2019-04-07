import { newValue } from "../../src/documents/DefaultValue";
import { FieldType } from "../../src/query/DocumentType";
import { QueryRoot } from "../../src/query/Schema";
import { describeIntegration } from "../toolkit/describeIntegration";

describeIntegration("QueryRoot", () => {
    it("should create update and list", async () => {
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

        created.values[0] = newValue("name", { text: "foo2" });

        const updated = await root.updateDocument({
            document: created,
            wait: true
        });

        expect(updated).toEqual(created);

        const found = await root.listDocuments({ type: type.id });
        expect(found).toContainEqual(created);

        const got = await root.getDocument({ type: type.id, id: updated.id });
        expect(got).toEqual(created);
    });
});
