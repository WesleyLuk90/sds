import * as React from "react";
import { FieldEditorProps } from "./FieldEditorProps";
import { Documents } from "../Documents";
import TextField from "@material-ui/core/TextField";

interface State {
    value: string;
}

export class NumberEditor extends React.Component<FieldEditorProps, State> {
    state: State = {
        value: this.props.value.number.toString()
    };

    componentDidUpdate(lastProps: FieldEditorProps) {
        if (this.props.value.number !== lastProps.value.number) {
            this.setState({ value: this.props.value.number.toString() });
        }
    }

    getNumberValue() {
        const value = parseFloat(this.state.value);
        if (isNaN(value)) {
            return 0;
        } else {
            return value;
        }
    }

    onBlur = () => {
        this.props.onChange(
            Documents.newValue(this.props.field, {
                number: this.getNumberValue()
            })
        );
    };

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ value: e.target.value });
    };

    render() {
        return (
            <div>
                <TextField
                    fullWidth
                    label={this.props.field.name}
                    value={this.state.value}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                />
            </div>
        );
    }
}
