import { DocumentType, Field, FieldType } from "../query/DocumentType";
import {
    Collection,
    CollectionField,
    CollectionFieldType,
    CollectionType
} from "./Collection";

function convertFieldType(fieldType: FieldType): CollectionFieldType {
    switch (fieldType) {
        case FieldType.ID:
            return CollectionFieldType.KEYWORD;
        case FieldType.TEXT:
            return CollectionFieldType.TEXT;
    }
    throw new Error(`Invalid field type ${fieldType}`);
}

function validateFieldTypes() {
    Object.keys(FieldType)
        .map(key => FieldType[key as any])
        .forEach(convertFieldType);
}

validateFieldTypes();

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
