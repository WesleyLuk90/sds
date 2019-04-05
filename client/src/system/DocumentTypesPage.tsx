import { Paper } from "@material-ui/core";
import * as React from "react";
import { Link } from "react-router-dom";
import { Actions } from "../components/Actions";
import { Layout } from "../components/Layout";
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
        <Link to={`/system/document-types/edit/${r.id}`}>
            {r.name || "<No Name>"}
        </Link>
    )),
    TableColumn.create(
        "fields",
        "Fields",
        (r: DocumentType) => `${r.fields.length} Fields`
    )
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
            <Layout title="Document Types">
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
            </Layout>
        );
    }
}
