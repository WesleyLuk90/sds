import { FormGroup, InputGroup } from "@blueprintjs/core";
import * as React from "react";

interface Props {
    label: string;
    placeholder?: string;
    value: string;
    onChange: (newValue: string) => void;
}

export class TextInput extends React.Component<Props> {
    id = Math.random().toString();

    render() {
        return (
            <FormGroup label={this.props.label} labelFor={this.id}>
                <InputGroup
                    id={this.id}
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
