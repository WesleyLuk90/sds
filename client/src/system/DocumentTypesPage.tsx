import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Edit from "@material-ui/icons/Edit";
import * as React from "react";
import { AppLink } from "../app/AppLink";
import { Actions } from "../components/Actions";
import { DefaultPage } from "../components/DefaultPage";
import { loader } from "../components/Loader";
import { Table, TableColumn } from "../components/Table";
import {
    DocumentType,
    DocumentTypeRequests
} from "./requests/DocumentTypeRequests";

interface State {
    documentTypes: DocumentType[] | null;
}

const COLUMNS = [
    TableColumn.create("name", "Name", (r: DocumentType) => (
        <AppLink to={`/system/document-types/edit/${r.id}`}>
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

export class DocumentTypesPage extends React.Component<{}, State> {
    state: State = {
        documentTypes: null
    };

    async componentDidMount() {
        this.setState({ documentTypes: await DocumentTypeRequests.list() });
    }

    render() {
        return (
            <DefaultPage title="Document Types">
                <Actions
                    actions={[
                        {
                            icon: "plus",
                            label: "New Document Type",
                            path: "/system/document-types/create"
                        }
                    ]}
                />
                {loader(this.state.documentTypes, documentTypes => (
                    <Paper>
                        <Table
                            rows={documentTypes}
                            rowKey={t => t.id}
                            columns={COLUMNS}
                        />
                    </Paper>
                ))}
            </DefaultPage>
        );
    }
}
