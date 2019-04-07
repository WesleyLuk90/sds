import { InputDocumentValue } from "../../__generated__/globalTypes";
import { DocumentField } from "../../system/requests/DocumentTypeRequests";

export interface FieldEditorProps {
    value: InputDocumentValue;
    field: DocumentField;
    onChange: (value: InputDocumentValue) => void;
}
