import { Button } from "@blueprintjs/core";
import * as React from "react";
import { DerivedIdField } from "../../components/forms/DerivedIdField";
import { Table, TableColumn } from "../../components/Table";
import { InputDocumentType, InputField } from "../../__generated__/globalTypes";
import { DocumentTypeUpdater } from "../DocumentTypeUpdater";
import { FieldEditor } from "./FieldEditor";

interface Props {
    new: boolean;
    documentType: InputDocumentType;
    onChange: (documentType: InputDocumentType) => void;
}

export class DocumentTypeEditor extends React.Component<Props> {
    COLUMNS: TableColumn<InputField>[] = [
        TableColumn.create("field", this.renderTitle(), row => (
            <FieldEditor
                new={this.props.new}
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

    onChangeNameId = (name: string, id: string) => {
        this.updateDocument(d => DocumentTypeUpdater.setNameId(d, name, id));
    };

    render() {
        const { name, id, fields } = this.props.documentType;
        return (
            <div>
                <DerivedIdField
                    label="Name"
                    value={name}
                    derivedLabel="ID"
                    derivedValue={id}
                    onChange={this.onChangeNameId}
                    new={this.props.new}
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
