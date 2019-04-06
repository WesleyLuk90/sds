import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { DefaultPage } from "../../components/DefaultPage";
import { InputDocumentType } from "../../__generated__/globalTypes";
import { DocumentTypeEditor } from "../components/DocumentTypeEditor";
import { DocumentTypeRequests } from "../requests/DocumentTypeRequests";

interface State {
    documentType: InputDocumentType;
}

export class BaseCreateDocumentTypePage extends React.Component<
    RouteComponentProps<any>,
    State
> {
    state: State = {
        documentType: {
            id: "",
            name: "",
            fields: []
        }
    };

    onCreate = async () => {
        const documentType = await DocumentTypeRequests.create(
            this.state.documentType
        );
        this.props.history.push(
            `/system/document-types/edit/${documentType.id}`
        );
    };

    render() {
        return (
            <DefaultPage title="Create a new Document Type">
                <DocumentTypeEditor
                    new
                    documentType={this.state.documentType}
                    onChange={d => this.setState({ documentType: d })}
                    onSave={this.onCreate}
                />
            </DefaultPage>
        );
    }
}

export const CreateDocumentTypePage = withRouter<RouteComponentProps<any>>(
    BaseCreateDocumentTypePage
);
