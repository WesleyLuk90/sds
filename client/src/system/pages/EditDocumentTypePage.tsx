import * as React from "react";
import { RouteComponentProps } from "react-router";
import { DefaultPage } from "../../components/DefaultPage";
import { loader } from "../../components/Loader";
import { InputDocumentType } from "../../__generated__/globalTypes";
import { DocumentTypeEditor } from "../components/DocumentTypeEditor";
import { DocumentTypeRequests } from "../requests/DocumentTypeRequests";

interface State {
    documentType: InputDocumentType | null;
}

export class EditDocumentTypePage extends React.Component<
    RouteComponentProps<{ id: string }>,
    State
> {
    state: State = {
        documentType: null
    };

    async componentDidMount() {
        const id = this.props.match.params.id;
        const type = await DocumentTypeRequests.get(id);
        this.setState({ documentType: type });
    }

    onUpdate = async (documentType: InputDocumentType) => {
        await DocumentTypeRequests.update(documentType);
    };

    render() {
        return (
            <DefaultPage title="Update Document Type">
                {loader(this.state.documentType, documentType => (
                    <DocumentTypeEditor
                        new={false}
                        documentType={documentType}
                        onChange={d => this.setState({ documentType: d })}
                        onSave={() => this.onUpdate(documentType)}
                    />
                ))}
            </DefaultPage>
        );
    }
}
