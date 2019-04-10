import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import * as React from "react";
import * as styles from "./DerivedIdField.css";

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

    toggleAutomatic = () => {
        let auto = !this.state.auto;
        this.setState({ auto });
        if (auto) {
            const derived = this.deriveValue(this.props.value);
            if (derived !== this.props.derivedValue) {
                this.props.onChange(this.props.value, derived);
            }
        }
    };

    renderIdField() {
        if (this.props.new) {
            return (
                <div className={styles.id}>
                    <TextField
                        label={this.props.derivedLabel}
                        value={this.props.derivedValue}
                        onChange={this.onChangeDerived}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.auto}
                                onChange={this.toggleAutomatic}
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
                    className={styles.id}
                />
            );
        }
    }

    render() {
        return (
            <div className={styles.container}>
                <TextField
                    label={this.props.label}
                    value={this.props.value}
                    onChange={this.onChange}
                    className={styles.derived}
                />
                {this.renderIdField()}
            </div>
        );
    }
}
