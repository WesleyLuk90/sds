import { Button } from "@blueprintjs/core";
import * as React from "react";
import { DerivedIdField } from "../../components/forms/DerivedIdField";
import { TextInput } from "../../components/forms/TextInput";
import { Table, TableColumn } from "../../components/Table";
import { InputDocumentType, InputField } from "../../__generated__/globalTypes";
import { DocumentTypeUpdater } from "../DocumentTypeUpdater";
import { FieldEditor } from "./FieldEditor";

interface Props {
    documentType: InputDocumentType;
    onChange: (documentType: InputDocumentType) => void;
}

export class DocumentTypeEditor extends React.Component<Props> {
    COLUMNS: TableColumn<InputField>[] = [
        TableColumn.create("field", this.renderTitle(), row => (
            <FieldEditor
                field={row}
                onChange={newField => this.onChangeField(row, newField)}
            />
        ))
    ];

    renderTitle() {
        return (
            <Button icon="plus" text="Add Field" onClick={() => this.onAdd()} />
        );
    }

    updateDocument(
        updater: (documentType: InputDocumentType) => InputDocumentType
    ) {
        this.props.onChange(updater(this.props.documentType));
    }

    onChangeField(oldField: InputField, newField: InputField) {
        this.updateDocument(d =>
            DocumentTypeUpdater.updateField(d, oldField, newField)
        );
    }

    onAdd() {
        this.updateDocument(d => DocumentTypeUpdater.addField(d));
    }

    onChangeId = (id: string) => {
        this.updateDocument(d => DocumentTypeUpdater.setId(d, id));
    };

    onChangeName = (name: string) => {
        this.updateDocument(d => DocumentTypeUpdater.setName(d, name));
    };

    render() {
        const { name, id, fields } = this.props.documentType;
        return (
            <div>
                <TextInput
                    label="Name"
                    placeholder="Name..."
                    value={name}
                    onChange={this.onChangeName}
                />
                <DerivedIdField
                    label="ID"
                    placeholder="ID..."
                    derivedFrom={name}
                    value={id}
                    onChange={this.onChangeId}
                />
                <h3>Fields</h3>
                <Table
                    rows={fields}
                    rowKey={(r, i) => i}
                    columns={this.COLUMNS}
                />
            </div>
        );
    }
}
