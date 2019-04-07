import * as React from "react";
import { FieldEditorProps } from "./FieldEditorProps";
import TextField from "@material-ui/core/TextField";
import { Documents } from "../Documents";
import { TextInput } from "../../components/forms/TextInput";

export class TextEditor extends React.Component<FieldEditorProps> {
    onChange = (newValue: string) => {
        this.props.onChange(
            Documents.newValue(this.props.field, { text: newValue })
        );
    };

    render() {
        return (
            <div>
                <TextInput
                    label={this.props.field.name}
                    value={this.props.value.text}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}
