import * as React from "react";
import { FieldEditorProps } from "./FieldEditorProps";
import { Documents } from "../Documents";
import { TextInput } from "../../components/forms/TextInput";

export class IdEditor extends React.Component<FieldEditorProps> {
    onChange = (newValue: string) => {
        this.props.onChange(
            Documents.newValue(this.props.field, { id: newValue })
        );
    };

    render() {
        return (
            <div>
                <TextInput
                    label={this.props.field.name}
                    value={this.props.value.id}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}
