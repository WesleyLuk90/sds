import * as React from "react";
import { InputDocumentValue, FieldType } from "../../__generated__/globalTypes";
import { DocumentField } from "../../system/requests/DocumentTypeRequests";

interface Props {
    value: InputDocumentValue | null;
    field: DocumentField;
    onChange: (value: InputDocumentValue) => void;
}

export class DefaultFieldEditor extends React.Component<Props> {
    render() {
        return "editor";
    }
}
