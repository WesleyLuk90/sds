import { FormControlLabel, Switch, TextField } from "@material-ui/core";
import * as React from "react";

interface Props {
    new: boolean;
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
        if (this.state.auto && this.props.new) {
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

    renderIdField() {
        if (this.props.new) {
            return (
                <div>
                    <TextField
                        label={this.props.derivedLabel}
                        value={this.props.derivedValue}
                        onChange={this.onChangeDerived}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.auto}
                                onChange={() =>
                                    this.setState({ auto: !this.state.auto })
                                }
                            />
                        }
                        label="Automatic"
                    />
                </div>
            );
        } else {
            return (
                <TextField
                    label={this.props.derivedLabel}
                    value={this.props.derivedValue}
                    onChange={this.onChangeDerived}
                    disabled
                />
            );
        }
    }

    render() {
        return (
            <div>
                <TextField
                    label={this.props.label}
                    value={this.props.value}
                    onChange={this.onChange}
                />
                {this.renderIdField()}
            </div>
        );
    }
}
