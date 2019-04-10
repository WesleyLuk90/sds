import IconButton from "@material-ui/core/IconButton";
import AddBox from "@material-ui/icons/AddBox";
import Edit from "@material-ui/icons/Edit";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { AppLink } from "../../app/AppLink";
import { Actions } from "../../components/Actions";
import { DataLoader } from "../../components/DataLoader";
import { DefaultPage } from "../../components/DefaultPage";
import { TablePanel } from "../../components/panels/TablePanel";
import { Table, TableColumn } from "../../components/Table";
import { Document, DocumentRequests } from "../requests/DocumentRequests";
import { DocumentType } from "../requests/DocumentTypeRequests";

const COLUMNS: TableColumn<Document>[] = [
    new TableColumn("id", "ID", d => d.id),
    new TableColumn("edit", "Edit", d => (
        <AppLink to={`/system/documents/edit/${d.type}/${d.id}`}>
            <IconButton>
                <Edit />
            </IconButton>
        </AppLink>
    ))
];

export class DocumentsListPage extends React.Component<
    RouteComponentProps<{ id: string }>
> {
    renderHeader(type: DocumentType) {
        return (
            <Actions
                actions={[
                    {
                        label: (
                            <>
                                <AddBox /> New Document
                            </>
                        ),
                        path: `/system/documents/create/${type.id}`
                    }
                ]}
            />
        );
    }

    render() {
        return (
            <DataLoader
                load={() => DocumentRequests.list(this.props.match.params.id)}
                render={({ documents, type }) => (
                    <DefaultPage title={type.name}>
                        <TablePanel header={this.renderHeader(type)}>
                            <Table
                                rowKey={d => d.id}
                                rows={documents}
                                columns={COLUMNS}
                            />
                        </TablePanel>
                    </DefaultPage>
                )}
            />
        );
    }
}
