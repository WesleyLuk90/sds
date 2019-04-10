import * as React from "react";
import { RouteComponentProps } from "react-router";
import { DataLoader } from "../../components/DataLoader";
import { DefaultPage } from "../../components/DefaultPage";
import { DefaultDocumentEditor } from "../../documents/components/DefaultDocumentEditor";
import { Documents } from "../../documents/Documents";
import { InputDocument } from "../../__generated__/globalTypes";
import { DocumentRequests } from "../requests/DocumentRequests";
import {
    DocumentType,
    DocumentTypeRequests
} from "../requests/DocumentTypeRequests";

class CreateDocumentComponent extends React.Component<
    { type: DocumentType },
    { document: InputDocument }
> {
    state = { document: Documents.newDocument(this.props.type) };

    onChange = (document: InputDocument) => {
        this.setState({ document });
    };

    onSave = async () => {
        await DocumentRequests.create(this.state.document);
    };

    render() {
        return (
            <DefaultDocumentEditor
                document={this.state.document}
                type={this.props.type}
                onChange={this.onChange}
                onSave={this.onSave}
            />
        );
    }
}

export class CreateDocumentPage extends React.Component<
    RouteComponentProps<{ id: string }>
> {
    render() {
        return (
            <DataLoader
                load={() =>
                    DocumentTypeRequests.get(this.props.match.params.id)
                }
                render={type => (
                    <DefaultPage title={`New ${type.name}`}>
                        <CreateDocumentComponent type={type} />
                    </DefaultPage>
                )}
            />
        );
    }
}
