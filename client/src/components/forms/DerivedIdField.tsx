import { FormGroup, InputGroup, Switch } from "@blueprintjs/core";
import * as React from "react";
import { TextInputProps } from "./TextInput";

interface Props extends TextInputProps {
    derivedFrom: string;
}

interface State {
    derived: boolean;
}

export class DerivedIdField extends React.Component<Props, State> {
    id = Math.random().toString();
    state: State = {
        derived:
            this.props.value === "" || this.getDerived() === this.props.value
    };

    componentDidUpdate() {
        if (this.state.derived && this.getDerived() !== this.props.value) {
            this.props.onChange(this.getDerived());
        }
    }

    getDerived() {
        return this.props.derivedFrom
            .toLowerCase()
            .replace(/[^a-z0-9-]/g, "-")
            .replace(/--*/, "-");
    }

    render() {
        return (
            <FormGroup label={this.props.label} labelFor={this.id}>
                <InputGroup
                    id={this.id}
                    disabled={this.props.disabled}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        this.setState({ derived: false });
                        this.props.onChange(e.target.value);
                    }}
                />
                <Switch
                    checked={this.state.derived}
                    label="Automatic"
                    onChange={() =>
                        this.setState({ derived: !this.state.derived })
                    }
                />
            </FormGroup>
        );
    }
}
