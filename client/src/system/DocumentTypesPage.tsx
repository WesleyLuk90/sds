import * as React from "react";
import { Layout } from "../components/Layout";
import { Table, TableColumn } from "../components/Table";
import {
    DocumentType,
    DocumentTypeRequests
} from "./requests/DocumentTypeRequests";

interface State {
    documentTypes: DocumentType[];
}

const COLUMNS = [
    TableColumn.create("name", "Name", (r: DocumentType) => r.name)
];

export class DocumentTypesPage extends React.Component<{}, State> {
    state: State = {
        documentTypes: []
    };

    async componentDidMount() {
        this.setState({ documentTypes: await DocumentTypeRequests.list() });
    }

    render() {
        return (
            <Layout title="Document Types">
                <Table
                    rows={this.state.documentTypes}
                    rowKey={t => t.id}
                    columns={COLUMNS}
                />
            </Layout>
        );
    }
}
