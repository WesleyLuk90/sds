import { DocumentType, Field, FieldType } from "../query/DocumentType";
import {
    Collection,
    CollectionField,
    CollectionFieldType,
    CollectionType
} from "./Collection";

export class CollectionService {
    convertFieldType(fieldType: FieldType): CollectionFieldType {
        switch (fieldType) {
            case FieldType.ID:
                return CollectionFieldType.KEYWORD;
            case FieldType.TEXT:
                return CollectionFieldType.TEXT;
        }
        throw new Error(`Invalid field type ${fieldType}`);
    }

    toCollectionField(field: Field): CollectionField {
        return new CollectionField(this.convertFieldType(field.type), field.id);
    }

    toCollection(documentType: DocumentType): Collection {
        return new Collection(CollectionType.USER, documentType.id).setFields(
            documentType.fields.map(this.toCollectionField)
        );
    }
}
