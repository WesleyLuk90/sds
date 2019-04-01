import { FormGroup, HTMLSelect } from "@blueprintjs/core";
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
            <FormGroup label="Field Type">
                <HTMLSelect
                    value={this.props.value}
                    options={this.options()}
                    onChange={this.onChange}
                />
            </FormGroup>
        );
    }
}
