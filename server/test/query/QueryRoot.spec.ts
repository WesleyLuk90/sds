import { newValue } from "../../src/documents/DefaultValue";
import { FieldType, Field, Option } from "../../src/models/DocumentType";
import { QueryRoot } from "../../src/query/Schema";
import { describeIntegration } from "../toolkit/describeIntegration";
import { Document } from "../../src/models/Document";

function field(id: string, type: FieldType, options: Option[] = []): Field {
    return {
        id,
        name: id,
        type,
        options
    };
}

describeIntegration("QueryRoot", () => {
    it("should create update and list", async () => {
        const root = await QueryRoot.create();
        const type = await root.createDocumentType({
            documentType: {
                id: "test-type",
                name: "Test Type",
                fields: [
                    field("name", FieldType.TEXT),
                    field("some-id", FieldType.ID),
                    field("number", FieldType.NUMBER),
                    field("tags", FieldType.TAGS),
                    field("option", FieldType.OPTION, [{ id: 0, label: "A" }]),
                    field("options", FieldType.OPTIONS, [
                        { id: 0, label: "A" }
                    ]),
                    field("boolean", FieldType.BOOLEAN)
                ]
            }
        });

        expect(type.fields.map(f => f.type).sort()).toEqual(
            Object.keys(FieldType)
                .map(k => FieldType[k as any])
                .sort()
        );

        const document: Document = {
            id: "",
            type: type.id,
            values: [
                newValue("name", { text: "foo" }),
                newValue("some-id", { id: "bar" }),
                newValue("number", { number: 5 }),
                newValue("tags", { tags: ["a"] }),
                newValue("option", { option: 0 }),
                newValue("options", { options: [0] }),
                newValue("boolean", { boolean: true })
            ]
        };

        const created = await root.createDocument({
            document,
            wait: true
        });
        expect(created.id).toBeTruthy();
        document.id = created.id;
        expect(document).toEqual(created);

        created.values[0] = newValue("name", { text: "foo2" });

        const updated = await root.updateDocument({
            document: created,
            wait: true
        });

        expect(updated).toEqual(created);

        const found = await root.documents({ type: type.id });
        expect(found).toContainEqual(created);

        const got = await root.document({ type: type.id, id: updated.id });
        expect(got).toEqual(created);
    });
});
