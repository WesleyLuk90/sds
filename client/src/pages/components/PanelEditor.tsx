import { MenuItem } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import * as React from "react";
import { AddButton } from "../../components/forms/AddButton";
import { Panel } from "../../components/panels/Panel";
import { DocumentType } from "../../system/requests/DocumentTypeRequests";
import { InputPanel } from "../../__generated__/globalTypes";
import { Panels } from "../Panels";

interface Props {
    panel: InputPanel;
    documentTypes: DocumentType[];
    onChange: (panel: InputPanel) => void;
}

export class PanelEditor extends React.Component<Props> {
    addControl = () => {};

    onChangeDocumentType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(Panels.setType(this.props.panel, event.target.value));
        this.props.onChange(
            Panels.setType(this.props.panel, event.target.value)
        );
    };

    render() {
        return (
            <Panel>
                <Select
                    value={this.props.panel.type}
                    onChange={this.onChangeDocumentType}
                >
                    {this.props.documentTypes.map(d => (
                        <MenuItem value={d.id} key={d.id}>
                            {d.name}
                        </MenuItem>
                    ))}
                </Select>
                <AddButton onClick={this.addControl}>Add Control</AddButton>
            </Panel>
        );
    }
}
