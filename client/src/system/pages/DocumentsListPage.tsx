import * as React from "react";
import { DefaultPage } from "../../components/DefaultPage";
import { RouteComponentProps } from "react-router";
import { Document, DocumentRequests } from "../requests/DocumentRequests";
import { TablePanel } from "../../components/panels/TablePanel";
import { loader } from "../../components/Loader";
import { DocumentType } from "../requests/DocumentTypeRequests";
import { Table, TableColumn } from "../../components/Table";
import { AppLink } from "../../app/AppLink";
import AddBox from "@material-ui/icons/AddBox";
import { Actions } from "../../components/Actions";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";

interface State {
    docs: { documents: Document[]; type: DocumentType } | null;
}

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
        return loader(this.state.docs, ({ documents, type }) => (
            <DefaultPage title={type.name}>
                <TablePanel header={this.renderHeader(type)}>
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
