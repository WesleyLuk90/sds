import * as React from "react";
import {
    InputDocument,
    InputDocumentValue
} from "../../__generated__/globalTypes";
import {
    DocumentType,
    DocumentField
} from "../../system/requests/DocumentTypeRequests";
import { SavePanel } from "../../components/panels/SavePanel";
import { DefaultFieldEditor } from "./DefaultFieldEditor";

interface Props {
    type: DocumentType;
    document: InputDocument;
    onChange: (doc: InputDocument) => void;
}

export class DefaultDocumentEditor extends React.Component<Props> {
    renderField(f: DocumentField) {
        const value = this.props.document.values.find(v => v.id === f.id);
        return (
            <DefaultFieldEditor
                field={f}
                value={value}
                onChange={newValue => this.onChange(f, newValue)}
            />
        );
    }

    onChange(f: DocumentField, newValue: InputDocumentValue) {}

    render() {
        return (
            <SavePanel dirty onSave={async () => {}}>
                {this.props.type.fields.map(f => this.renderField(f))}
            </SavePanel>
        );
    }
}
