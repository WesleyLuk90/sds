import { Document } from "../query/Document";
import { DocumentType } from "../query/DocumentType";
import { RawDocument } from "../storage/Storage";
import { forType } from "./FieldTypeHandler";
import { checkNotNull } from "../utils/checkNotNull";

export class DocumentSerializer {
    static serialize(
        documentType: DocumentType,
        document: Document
    ): RawDocument {
        const raw: RawDocument = { id: document.id };
        documentType.fields.forEach(field => {
            (raw as any)[field.id] = forType(field.type).serialize(
                document.values.find(v => v.fieldId == field.id)
            );
        });
        return raw;
    }

    static deserialize(documentType: DocumentType, raw: RawDocument): Document {
        const document: Document = {
            id: checkNotNull(raw.id),
            type: documentType.id,
            values: []
        };
        documentType.fields.forEach(field => {
            document.values.push(
                forType(field.type).deserialize(field, (raw as any)[field.id])
            );
        });
        return document;
    }
}
