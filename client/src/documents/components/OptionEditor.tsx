import * as React from "react";
import { FieldEditorProps } from "./FieldEditorProps";
import { Documents } from "../Documents";
import { TextInput } from "../../components/forms/TextInput";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

export class OptionEditor extends React.Component<FieldEditorProps> {
    onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = this.props.field.options
            .map(o => o.id)
            .find(id => id.toString() === e.target.value.toString());
        this.props.onChange(
            Documents.newValue(this.props.field, {
                option: newValue
            })
        );
    };

    getCurrent() {
        if (this.props.value.option == null) {
            return "";
        } else {
            return this.props.value.option.toString();
        }
    }

    render() {
        return (
            <FormControl fullWidth>
                <InputLabel htmlFor="age-simple">
                    {this.props.field.name}
                </InputLabel>
                <Select value={this.getCurrent()} onChange={this.onChange}>
                    <MenuItem value="">Empty</MenuItem>
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
