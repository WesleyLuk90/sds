import * as React from "react";
import { RouteComponentProps } from "react-router";
import {
    DocumentTypeRequests,
    DocumentType
} from "../requests/DocumentTypeRequests";
import { InputDocument } from "../../__generated__/globalTypes";
import { loader } from "../../components/Loader";
import { DefaultPage } from "../../components/DefaultPage";
import { Documents } from "../../documents/Documents";
import { DefaultDocumentEditor } from "../../documents/components/DefaultDocumentEditor";

interface State {
    type: DocumentType | null;
}

class CreateDocumentComponent extends React.Component<
    { type: DocumentType },
    { document: InputDocument }
> {
    state = { document: Documents.newDocument(this.props.type) };

    onChange = (document: InputDocument) => {
        this.setState({ document });
    };

    render() {
        return (
            <DefaultDocumentEditor
                document={this.state.document}
                type={this.props.type}
                onChange={this.onChange}
            />
        );
    }
}

export class CreateDocumentPage extends React.Component<
    RouteComponentProps<{ id: string }>,
    State
> {
    state: State = { type: null };

    async componentDidMount() {
        const type = await DocumentTypeRequests.get(this.props.match.params.id);
        this.setState({ type });
    }

    render() {
        return loader(this.state.type, type => (
            <DefaultPage title={`New ${type.name}`}>
                <CreateDocumentComponent type={type} />
            </DefaultPage>
        ));
    }
}
