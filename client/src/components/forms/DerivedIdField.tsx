import { FormGroup, InputGroup, Switch } from "@blueprintjs/core";
import * as React from "react";

interface Props {
    label: string;
    derivedLabel: string;
    value: string;
    derivedValue: string;
    onChange: (value: string, derivedValue: string) => void;
}

interface State {
    auto: boolean;
}

export class DerivedIdField extends React.Component<Props, State> {
    valueId = Math.random().toString();
    derivedValueId = Math.random().toString();

    state: State = {
        auto:
            this.props.derivedValue === "" ||
            this.deriveValue(this.props.value) === this.props.derivedValue
    };

    deriveValue(value: string) {
        return value
            .toLowerCase()
            .replace(/[^a-z0-9-]/g, "-")
            .replace(/--*/, "-");
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (this.state.auto) {
            this.props.onChange(
                e.target.value,
                this.deriveValue(e.target.value)
            );
        } else {
            this.props.onChange(e.target.value, this.props.derivedValue);
        }
    };

    onChangeDerived = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ auto: false });
        this.props.onChange(this.props.value, e.target.value);
    };

    render() {
        return (
            <div>
                <FormGroup label={this.props.label} labelFor={this.valueId}>
                    <InputGroup
                        id={this.valueId}
                        value={this.props.value}
                        onChange={this.onChange}
                    />
                </FormGroup>
                <FormGroup
                    label={this.props.derivedLabel}
                    labelFor={this.valueId}
                >
                    <InputGroup
                        id={this.derivedValueId}
                        value={this.props.derivedValue}
                        onChange={this.onChangeDerived}
                    />
                    <Switch
                        checked={this.state.auto}
                        label="Automatic"
                        onChange={() =>
                            this.setState({ auto: !this.state.auto })
                        }
                    />
                </FormGroup>
            </div>
        );
    }
}
