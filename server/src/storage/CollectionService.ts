import { DocumentType, Field, FieldType } from "../query/DocumentType";
import {
    Collection,
    CollectionField,
    CollectionFieldType,
    CollectionType
} from "./Collection";

const FIELD_TYPE_MAP: { [key in FieldType]: CollectionFieldType } = {
    id: CollectionFieldType.KEYWORD,
    text: CollectionFieldType.TEXT,
    number: CollectionFieldType.DOUBLE,
    tags: CollectionFieldType.KEYWORD,
    option: CollectionFieldType.INTEGER
};

function convertFieldType(fieldType: FieldType): CollectionFieldType {
    return FIELD_TYPE_MAP[fieldType];
}

export class CollectionService {
    private toCollectionField(field: Field): CollectionField {
        return new CollectionField(convertFieldType(field.type), field.id);
    }

    toCollection(documentType: DocumentType): Collection {
        return new Collection(CollectionType.USER, documentType.id).setFields(
            documentType.fields.map(f => this.toCollectionField(f))
        );
    }
}
