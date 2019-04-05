import { Button } from "@material-ui/core";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Layout } from "../components/Layout";
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
        const documentType = await DocumentTypeRequests.create(
            this.state.documentType
        );
    };

    render() {
        return (
            <Layout title="Update Document Type">
                {loader(this.state.documentType, documentType => (
                    <div>
                        <DocumentTypeEditor
                            new={false}
                            documentType={documentType}
                            onChange={d => this.setState({ documentType: d })}
                        />
                        <Button variant="contained" onClick={this.onUpdate}>
                            Update
                        </Button>
                    </div>
                ))}
            </Layout>
        );
    }
}
