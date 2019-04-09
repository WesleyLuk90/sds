import * as React from "react";
import { FieldEditorProps } from "./FieldEditorProps";
import { Documents } from "../Documents";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export class BooleanEditor extends React.Component<FieldEditorProps> {
    onChange = () => {
        this.props.onChange(
            Documents.newValue(this.props.field, {
                boolean: !this.props.value.boolean
            })
        );
    };

    render() {
        return (
            <FormControlLabel
                label={this.props.field.name}
                control={
                    <Switch
                        checked={this.props.value.boolean}
                        onChange={this.onChange}
                    />
                }
            />
        );
    }
}
