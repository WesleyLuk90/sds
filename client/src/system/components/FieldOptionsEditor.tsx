import * as React from "react";
import {
    InputField,
    FieldType,
    InputOption
} from "../../__generated__/globalTypes";
import { Table, TableColumn } from "../../components/Table";
import { TextInput } from "../../components/forms/TextInput";
import { VerticalLayout } from "../../components/layout/VerticalLayout";
import Button from "@material-ui/core/Button";
import AddBox from "@material-ui/icons/AddBox";
import { DocumentTypes } from "../../documents/DocumentTypes";
import { InputLabel } from "@material-ui/core";

interface Props {
    field: InputField;
    onChange: (field: InputField) => void;
}

export class FieldOptionsEditor extends React.Component<Props> {
    onAdd = () => {
        this.props.onChange(DocumentTypes.addOption(this.props.field));
    };

    updateLabel(option: InputOption, label: string) {
        this.props.onChange(
            DocumentTypes.updateOption(this.props.field, option, {
                ...option,
                label
            })
        );
    }

    render() {
        if (
            this.props.field.type !== FieldType.option &&
            this.props.field.type !== FieldType.options
        ) {
            return null;
        }
        return (
            <VerticalLayout>
                <Table
                    rows={this.props.field.options}
                    rowKey={i => i.id}
                    columns={[
                        new TableColumn<InputOption>("id", "ID", i =>
                            i.id.toString()
                        ),
                        new TableColumn<InputOption>("label", "Label", i => (
                            <TextInput
                                value={i.label}
                                onChange={newLabel =>
                                    this.updateLabel(i, newLabel)
                                }
                            />
                        )),
                        new TableColumn<InputOption>("actions", "", i => null)
                    ]}
                />
                <Button onClick={this.onAdd}>
                    <AddBox /> Add Field
                </Button>
            </VerticalLayout>
        );
    }
}
