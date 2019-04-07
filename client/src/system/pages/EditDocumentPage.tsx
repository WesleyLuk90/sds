import * as React from "react";
import { RouteComponentProps } from "react-router";
import { DocumentType } from "../requests/DocumentTypeRequests";
import { InputDocument } from "../../__generated__/globalTypes";
import { loader } from "../../components/Loader";
import { DefaultPage } from "../../components/DefaultPage";
import { Documents } from "../../documents/Documents";
import { DefaultDocumentEditor } from "../../documents/components/DefaultDocumentEditor";
import { DocumentRequests, Document } from "../requests/DocumentRequests";

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

interface State {
    info: {
        document: Document;
        type: DocumentType;
    } | null;
}

export class EditDocumentPage extends React.Component<
    RouteComponentProps<{ type: string; id: string }>,
    State
> {
    state: State = { info: null };

    async componentDidMount() {
        const info = await DocumentRequests.get(
            this.props.match.params.type,
            this.props.match.params.id
        );
        this.setState({ info });
    }

    render() {
        return loader(this.state.info, info => (
            <DefaultPage title={`Edit ${info.type.name}`}>
                <EditDocumentComponent
                    type={info.type}
                    document={info.document}
                />
            </DefaultPage>
        ));
    }
}
