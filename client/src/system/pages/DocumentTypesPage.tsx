import IconButton from "@material-ui/core/IconButton";
import AddBox from "@material-ui/icons/AddBox";
import Edit from "@material-ui/icons/Edit";
import * as React from "react";
import { AppLink } from "../../app/AppLink";
import { Actions } from "../../components/Actions";
import { DataLoader } from "../../components/DataLoader";
import { DefaultPage } from "../../components/DefaultPage";
import { TablePanel } from "../../components/panels/TablePanel";
import { Table, TableColumn } from "../../components/Table";
import {
    DocumentType,
    DocumentTypeRequests
} from "../requests/DocumentTypeRequests";

const COLUMNS = [
    TableColumn.create("name", "Name", (r: DocumentType) => (
        <AppLink to={`/system/documents/list/${r.id}`}>
            {r.name || "<No Name>"}
        </AppLink>
    )),
    TableColumn.create(
        "fields",
        "Fields",
        (r: DocumentType) => `${r.fields.length} Fields`
    ),
    TableColumn.create("edit", "Edit", (r: DocumentType) => (
        <AppLink to={`/system/document-types/edit/${r.id}`}>
            <IconButton>
                <Edit />
            </IconButton>
        </AppLink>
    ))
];

export class DocumentTypesPage extends React.Component {
    renderActions() {
        return (
            <Actions
                actions={[
                    {
                        label: (
                            <>
                                <AddBox /> New Document Type
                            </>
                        ),
                        path: "/system/document-types/create"
                    }
                ]}
            />
        );
    }

    render() {
        return (
            <DefaultPage title="Document Types">
                <DataLoader
                    load={() => DocumentTypeRequests.list()}
                    render={documentTypes => (
                        <TablePanel header={this.renderActions()}>
                            <Table
                                rows={documentTypes}
                                rowKey={t => t.id}
                                columns={COLUMNS}
                            />
                        </TablePanel>
                    )}
                />
            </DefaultPage>
        );
    }
}
