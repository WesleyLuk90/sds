import * as React from "react";
import { AddButton } from "../../components/forms/AddButton";
import { TextInput } from "../../components/forms/TextInput";
import { VerticalLayout } from "../../components/layout/VerticalLayout";
import { DocumentType } from "../../system/requests/DocumentTypeRequests";
import { InputPage, InputPanel } from "../../__generated__/globalTypes";
import { Pages } from "../Pages";
import { PanelEditor } from "./PanelEditor";

interface Props {
    page: InputPage;
    documentTypes: DocumentType[];
    onChange: (page: InputPage) => void;
}

export class PageEditor extends React.Component<Props> {
    onChangeId = (id: string) => {
        this.props.onChange(Pages.update(this.props.page, { id }));
    };

    onChangePanel = (panel: InputPanel, newPanel: InputPanel) => {
        this.props.onChange(
            Pages.updatePanel(this.props.page, panel, newPanel)
        );
    };

    addPanel = () => {
        this.props.onChange(Pages.addPanel(this.props.page));
    };

    render() {
        return (
            <div>
                <VerticalLayout>
                    <TextInput
                        label="Page slug"
                        value={this.props.page.id}
                        onChange={this.onChangeId}
                    />
                    {this.props.page.panels.map((p, i) => (
                        <PanelEditor
                            key={i}
                            panel={p}
                            documentTypes={this.props.documentTypes}
                            onChange={newPanel =>
                                this.onChangePanel(p, newPanel)
                            }
                        />
                    ))}
                    <AddButton onClick={this.addPanel}>Add Panel</AddButton>
                </VerticalLayout>
            </div>
        );
    }
}
