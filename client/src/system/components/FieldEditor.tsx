import * as React from "react";
import { TextInput } from "../../components/forms/TextInput";
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
                <TextInput
                    label="Field Name"
                    value={name}
                    onChange={name =>
                        this.props.onChange({ ...this.props.field, name })
                    }
                />
                <TextInput
                    label="Field ID"
                    value={id}
                    onChange={id =>
                        this.props.onChange({ ...this.props.field, id })
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