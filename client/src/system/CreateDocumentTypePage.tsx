import { Button } from "@blueprintjs/core";
import * as React from "react";
import { TextInput } from "../components/forms/TextInput";
import { Layout } from "../components/Layout";
import { Table, TableColumn } from "../components/Table";
import { InputDocumentType, InputField } from "../__generated__/globalTypes";
import { FieldEditor } from "./components/FieldEditor";
import { DocumentTypeUpdater } from "./DocumentTypeUpdater";

interface State {
    documentType: InputDocumentType;
}

export class CreateDocumentTypePage extends React.Component<{}, State> {
    state: State = {
        documentType: {
            id: "",
            name: "",
            fields: []
        }
    };

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
        this.setState({ documentType: updater(this.state.documentType) });
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
        return (
            <Layout title="Create a new Document Type">
                <TextInput
                    label="Name"
                    placeholder="Name..."
                    value={this.state.documentType.name}
                    onChange={this.onChangeName}
                />
                <TextInput
                    label="ID"
                    placeholder="ID..."
                    value={this.state.documentType.id}
                    onChange={this.onChangeId}
                />
                <h3>Fields</h3>
                <Table
                    rows={this.state.documentType.fields}
                    rowKey={(r, i) => i}
                    columns={this.COLUMNS}
                />
            </Layout>
        );
    }
}
