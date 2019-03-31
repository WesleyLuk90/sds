import * as React from "react";
import { TextInput } from "../components/forms/TextInput";
import { Layout } from "../components/Layout";
import { InputDocumentType } from "../__generated__/globalTypes";

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

    onChangeId = (id: string) => {
        this.setState({ documentType: { ...this.state.documentType, id } });
    };

    onChangeName = (name: string) => {
        this.setState({ documentType: { ...this.state.documentType, name } });
    };

    render() {
        return (
            <Layout title="Create a new Document Type">
                <TextInput
                    label="Name"
                    placeholder="Name..."
                    value={this.state.documentType.name}
                    onChange={this.onChangeName}
                />
                <TextInput
                    label="ID"
                    placeholder="ID..."
                    value={this.state.documentType.id}
                    onChange={this.onChangeId}
                />
            </Layout>
        );
    }
}
