import {
    Button,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Typography
} from "@material-ui/core";
import * as React from "react";
import { theme } from "../../app/Application";
import { DerivedIdField } from "../../components/forms/DerivedIdField";
import { Panel } from "../../components/Panel";
import { InputDocumentType, InputField } from "../../__generated__/globalTypes";
import { DocumentTypeUpdater } from "../DocumentTypeUpdater";
import { FieldEditor } from "./FieldEditor";

interface Props {
    new: boolean;
    documentType: InputDocumentType;
    onChange: (documentType: InputDocumentType) => void;
}

export class DocumentTypeEditor extends React.Component<Props> {
    updateDocument(
        updater: (documentType: InputDocumentType) => InputDocumentType
    ) {
        this.props.onChange(updater(this.props.documentType));
    }

    onChangeField(oldField: InputField, newField: InputField) {
        this.updateDocument(d =>
            DocumentTypeUpdater.updateField(d, oldField, newField)
        );
    }

    onAdd() {
        this.updateDocument(d => DocumentTypeUpdater.addField(d));
    }

    onChangeNameId = (name: string, id: string) => {
        this.updateDocument(d => DocumentTypeUpdater.setNameId(d, name, id));
    };

    render() {
        const { name, id, fields } = this.props.documentType;
        return (
            <Panel>
                <Typography variant="h4">Document Type Properties</Typography>
                <DerivedIdField
                    label="Name"
                    value={name}
                    derivedLabel="ID"
                    derivedValue={id}
                    onChange={this.onChangeNameId}
                    new={this.props.new}
                />
                <Typography
                    variant="h4"
                    style={{ marginBottom: theme.spacing.unit * 2 }}
                >
                    Fields
                </Typography>
                <div style={{ marginBottom: theme.spacing.unit * 2 }}>
                    <Button color="primary" onClick={() => this.onAdd()}>
                        Add Field
                    </Button>
                </div>
                {fields.map((f, i) => (
                    <ExpansionPanel key={i}>
                        <ExpansionPanelSummary>
                            {f.name}({f.id})
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <FieldEditor
                                new={this.props.new}
                                field={f}
                                onChange={newField =>
                                    this.onChangeField(f, newField)
                                }
                            />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))}
                {this.props.children}
            </Panel>
        );
    }
}
