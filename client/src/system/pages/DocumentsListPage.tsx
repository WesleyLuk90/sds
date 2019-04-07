import * as React from "react";
import { DefaultPage } from "../../components/DefaultPage";
import { RouteComponentProps } from "react-router";
import { Document, DocumentRequests } from "../requests/DocumentRequests";
import { TablePanel } from "../../components/panels/TablePanel";
import { loader } from "../../components/Loader";
import { DocumentType } from "../requests/DocumentTypeRequests";
import { Table, TableColumn } from "../../components/Table";

interface State {
    docs: { documents: Document[]; type: DocumentType } | null;
}

const COLUMNS: TableColumn<Document>[] = [
    new TableColumn("id", "ID", d => d.id)
];

export class DocumentsListPage extends React.Component<
    RouteComponentProps<{ id: string }>,
    State
> {
    state: State = {
        docs: null
    };

    async componentDidMount() {
        const docs = await DocumentRequests.list(this.props.match.params.id);
        this.setState({ docs });
    }

    render() {
        return loader(this.state.docs, ({ documents, type }) => (
            <DefaultPage title={type.name}>
                <TablePanel header="">
                    <Table
                        rowKey={d => d.id}
                        rows={documents}
                        columns={COLUMNS}
                    />
                </TablePanel>
            </DefaultPage>
        ));
    }
}
