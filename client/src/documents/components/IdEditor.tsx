import * as React from "react";
import { FieldEditorProps } from "./FieldEditorProps";
import TextField from "@material-ui/core/TextField";
import { Documents } from "../Documents";

export class IdEditor extends React.Component<FieldEditorProps> {
    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(
            Documents.newValue(this.props.field, { id: e.target.value })
        );
    };

    render() {
        return (
            <div>
                <TextField
                    label={this.props.field.name}
                    value={this.props.field.id}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}
