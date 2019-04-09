import * as React from "react";
import { FieldEditorProps } from "./FieldEditorProps";
import { Documents } from "../Documents";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

export class OptionsEditor extends React.Component<FieldEditorProps> {
    onChange = (e: React.ChangeEvent<{ value: string[] }>) => {
        const selected = new Set(e.target.value);
        const newValue = this.props.field.options
            .map(o => o.id)
            .filter(o => selected.has(o.toString()));
        this.props.onChange(
            Documents.newValue(this.props.field, {
                options: newValue
            })
        );
    };

    render() {
        return (
            <FormControl fullWidth>
                <InputLabel htmlFor="age-simple">
                    {this.props.field.name}
                </InputLabel>
                <Select
                    value={this.props.value.options.map(o => o.toString())}
                    onChange={this.onChange as any}
                    multiple
                >
                    {this.props.field.options.map(o => (
                        <MenuItem value={o.id.toString()} key={o.id}>
                            {o.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
}
