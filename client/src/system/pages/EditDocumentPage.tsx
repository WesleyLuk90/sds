import * as React from "react";
import { RouteComponentProps } from "react-router";
import { DataLoader } from "../../components/DataLoader";
import { DefaultPage } from "../../components/DefaultPage";
import { DefaultDocumentEditor } from "../../documents/components/DefaultDocumentEditor";
import { InputDocument } from "../../__generated__/globalTypes";
import { Document, DocumentRequests } from "../requests/DocumentRequests";
import { DocumentType } from "../requests/DocumentTypeRequests";

class EditDocumentComponent extends React.Component<
    { type: DocumentType; document: Document },
    { document: InputDocument }
> {
    state = { document: this.props.document };

    onChange = (document: InputDocument) => {
        this.setState({ document });
    };

    onSave = async () => {
        await DocumentRequests.update(this.state.document);
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

export class EditDocumentPage extends React.Component<
    RouteComponentProps<{ type: string; id: string }>
> {
    render() {
        return (
            <DataLoader
                load={() =>
                    DocumentRequests.get(
                        this.props.match.params.type,
                        this.props.match.params.id
                    )
                }
                render={({ type, document }) => (
                    <DefaultPage title={`Edit ${type.name}`}>
                        <EditDocumentComponent
                            type={type}
                            document={document}
                        />
                    </DefaultPage>
                )}
            />
        );
    }
}
