import {
    Button,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary
} from "@material-ui/core";
import { AddBox, ExpandMore } from "@material-ui/icons";
import * as React from "react";
import { theme } from "../../app/Application";
import { DerivedIdField } from "../../components/forms/DerivedIdField";
import { VerticalLayout } from "../../components/layout/VerticalLayout";
import { Panel } from "../../components/Panel";
import { SectionHeader } from "../../components/typograpy/SectionHeader";
import { Title } from "../../components/typograpy/Title";
import { InputDocumentType, InputField } from "../../__generated__/globalTypes";
import { DocumentTypeUpdater } from "../DocumentTypeUpdater";
import { FieldEditor } from "./FieldEditor";

interface Props {
    new: boolean;
    documentType: InputDocumentType;
    onChange: (documentType: InputDocumentType) => void;
}

interface State {
    expanded: Set<number>;
    newFields: Set<number>;
}

export class DocumentTypeEditor extends React.Component<Props, State> {
    state: State = {
        expanded: new Set(),
        newFields: new Set()
    };

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
        const nextIndex = this.props.documentType.fields.length;
        this.updateDocument(d => DocumentTypeUpdater.addField(d));
        this.toggleExpanded(true, nextIndex);
        const { newFields } = this.state;
        newFields.add(nextIndex);
        this.setState({ newFields });
    }

    onChangeNameId = (name: string, id: string) => {
        this.updateDocument(d => DocumentTypeUpdater.setNameId(d, name, id));
    };

    toggleExpanded = (newState: boolean, index: number) => {
        const { expanded } = this.state;
        if (newState) {
            expanded.add(index);
        } else {
            expanded.delete(index);
        }
        this.setState({ expanded });
    };

    renderTitle(field: InputField) {
        if (!field.id) {
            return <Title>New Field</Title>;
        } else {
            return (
                <Title>
                    {field.name}({field.id})
                </Title>
            );
        }
    }

    render() {
        const { name, id, fields } = this.props.documentType;
        return (
            <Panel>
                <VerticalLayout>
                    <SectionHeader>Document Type Properties</SectionHeader>
                    <DerivedIdField
                        label="Name"
                        value={name}
                        derivedLabel="ID"
                        derivedValue={id}
                        onChange={this.onChangeNameId}
                        new={this.props.new}
                    />
                    <SectionHeader>Fields</SectionHeader>
                    <div style={{ marginBottom: theme.spacing.unit * 2 }}>
                        <Button color="primary" onClick={() => this.onAdd()}>
                            <AddBox /> Add Field
                        </Button>
                    </div>
                    {fields.map((f, i) => (
                        <ExpansionPanel
                            key={i}
                            expanded={this.state.expanded.has(i)}
                            onChange={(e, expanded) =>
                                this.toggleExpanded(expanded, i)
                            }
                        >
                            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                                {this.renderTitle(f)}
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <FieldEditor
                                    new={this.state.newFields.has(i)}
                                    field={f}
                                    onChange={newField =>
                                        this.onChangeField(f, newField)
                                    }
                                />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    ))}
                    {this.props.children}
                </VerticalLayout>
            </Panel>
        );
    }
}
