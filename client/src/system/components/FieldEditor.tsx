import * as React from "react";
import { DerivedIdField } from "../../components/forms/DerivedIdField";
import { InputField } from "../../__generated__/globalTypes";
import { FieldTypeSelector } from "./FieldTypeSelector";

interface Props {
    field: InputField;
    onChange: (field: InputField) => void;
}

export class FieldEditor extends React.Component<Props> {
    render() {
        const { id, name, type } = this.props.field;
        return (
            <div>
                <DerivedIdField
                    label="Field Name"
                    value={name}
                    derivedLabel="Field ID"
                    derivedValue={id}
                    onChange={(name, id) =>
                        this.props.onChange({ ...this.props.field, name, id })
                    }
                />
                <FieldTypeSelector
                    value={type}
                    onChange={type =>
                        this.props.onChange({ ...this.props.field, type })
                    }
                />
            </div>
        );
    }
}
