import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import * as React from "react";
import { FieldType } from "../../__generated__/globalTypes";

interface Props {
    value: FieldType;
    onChange: (type: FieldType) => void;
}

export class FieldTypeSelector extends React.Component<Props> {
    options(): FieldType[] {
        return Object.keys(FieldType) as FieldType[];
    }

    onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const type = this.options().find(k => k === event.target.value);
        if (type == null) {
            throw new Error("Illegal state");
        }
        this.props.onChange(type);
    };

    render() {
        return (
            <FormControl style={{ width: 400 }}>
                <InputLabel>Field Type</InputLabel>
                <Select value={this.props.value} onChange={this.onChange}>
                    {this.options().map(o => (
                        <MenuItem value={o} key={o}>
                            {o}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
}
