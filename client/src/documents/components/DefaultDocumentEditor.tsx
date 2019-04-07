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
import { VerticalLayout } from "../../components/layout/VerticalLayout";
import { Documents } from "../Documents";

interface Props {
    type: DocumentType;
    document: InputDocument;
    onChange: (doc: InputDocument) => void;
    onSave: () => Promise<void>;
}

export class DefaultDocumentEditor extends React.Component<Props> {
    renderField(f: DocumentField) {
        const value = this.props.document.values.find(v => v.fieldId === f.id);
        return (
            <DefaultFieldEditor
                key={f.id}
                field={f}
                value={value}
                onChange={newValue => this.onChange(f, newValue)}
            />
        );
    }

    onChange(f: DocumentField, newValue: InputDocumentValue) {
        this.props.onChange(
            Documents.updateValue(f, newValue, this.props.document)
        );
    }

    render() {
        return (
            <SavePanel dirty onSave={this.props.onSave}>
                <VerticalLayout>
                    {this.props.type.fields.map(f => this.renderField(f))}
                </VerticalLayout>
            </SavePanel>
        );
    }
}
