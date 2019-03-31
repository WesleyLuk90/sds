import * as React from "react";
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
    TableColumn.create("name", "Name", (r: DocumentType) => r.name)
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
                    <Table
                        rows={documentTypes}
                        rowKey={t => t.id}
                        columns={COLUMNS}
                    />
                ))}
            </Layout>
        );
    }
}
