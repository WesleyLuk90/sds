import * as React from "react";
import { DefaultPage } from "../components/DefaultPage";
import { InputDocumentType } from "../__generated__/globalTypes";
import { DocumentTypeEditor } from "./components/DocumentTypeEditor";
import { DocumentTypeRequests } from "./requests/DocumentTypeRequests";

interface State {
    documentType: InputDocumentType;
}

export class CreateDocumentTypePage extends React.Component<{}, State> {
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
