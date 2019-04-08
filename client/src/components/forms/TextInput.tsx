import TextField from "@material-ui/core/TextField";
import * as React from "react";

export interface TextInputProps {
    label: string;
    value: string;
    onChange: (newValue: string) => void;
    placeholder?: string;
    disabled?: boolean;
}

export class TextInput extends React.Component<TextInputProps> {
    id = Math.random().toString();

    render() {
        return (
            <TextField
                fullWidth
                label={this.props.label}
                disabled={this.props.disabled}
                placeholder={this.props.placeholder}
                value={this.props.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    this.props.onChange(e.target.value)
                }
            />
        );
    }
}
