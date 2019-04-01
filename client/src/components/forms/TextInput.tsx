import { FormGroup, InputGroup } from "@blueprintjs/core";
import * as React from "react";

export interface TextInputProps {
    label: string;
    placeholder?: string;
    value: string;
    disabled?: boolean;
    onChange: (newValue: string) => void;
}

export class TextInput extends React.Component<TextInputProps> {
    id = Math.random().toString();

    render() {
        return (
            <FormGroup label={this.props.label} labelFor={this.id}>
                <InputGroup
                    id={this.id}
                    disabled={this.props.disabled}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        this.props.onChange(e.target.value)
                    }
                />
            </FormGroup>
        );
    }
}
