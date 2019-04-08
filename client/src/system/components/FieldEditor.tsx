import * as React from "react";
import { DerivedIdField } from "../../components/forms/DerivedIdField";
import { VerticalLayout } from "../../components/layout/VerticalLayout";
import { InputField } from "../../__generated__/globalTypes";
import { FieldTypeSelector } from "./FieldTypeSelector";
import { Table, TableColumn } from "../../components/Table";
import { TextInput } from "../../components/forms/TextInput";
import { FieldOptionsEditor } from "./FieldOptionsEditor";

interface Props {
    new: boolean;
    field: InputField;
    onChange: (field: InputField) => void;
}

export class FieldEditor extends React.Component<Props> {
    render() {
        const { id, name, type } = this.props.field;
        return (
            <VerticalLayout>
                <DerivedIdField
                    label="Field Name"
                    value={name}
                    derivedLabel="Field ID"
                    derivedValue={id}
                    onChange={(name, id) =>
                        this.props.onChange({ ...this.props.field, name, id })
                    }
                    new={this.props.new}
                />
                <FieldTypeSelector
                    new={this.props.new}
                    value={type}
                    onChange={type =>
                        this.props.onChange({ ...this.props.field, type })
                    }
                />
                <FieldOptionsEditor
                    field={this.props.field}
                    onChange={this.props.onChange}
                />
            </VerticalLayout>
        );
    }
}
