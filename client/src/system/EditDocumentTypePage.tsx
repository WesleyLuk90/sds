import Button from "@material-ui/core/Button";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { DefaultPage } from "../components/DefaultPage";
import { loader } from "../components/Loader";
import { InputDocumentType } from "../__generated__/globalTypes";
import { DocumentTypeEditor } from "./components/DocumentTypeEditor";
import { DocumentTypeRequests } from "./requests/DocumentTypeRequests";

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

    onUpdate = async () => {
        await DocumentTypeRequests.create(this.state.documentType);
    };

    render() {
        return (
            <DefaultPage title="Update Document Type">
                {loader(this.state.documentType, documentType => (
                    <div>
                        <DocumentTypeEditor
                            new={false}
                            documentType={documentType}
                            onChange={d => this.setState({ documentType: d })}
                        >
                            <Button variant="contained" onClick={this.onUpdate}>
                                Update
                            </Button>
                        </DocumentTypeEditor>
                    </div>
                ))}
            </DefaultPage>
        );
    }
}
