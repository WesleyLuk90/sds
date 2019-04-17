import * as React from "react";
import { DataLoader } from "../../components/DataLoader";
import { DefaultPage } from "../../components/DefaultPage";
import { Panel } from "../../components/panels/Panel";
import { PageEditor } from "../../pages/components/PageEditor";
import { Pages } from "../../pages/Pages";
import { InputPage } from "../../__generated__/globalTypes";
import {
    DocumentType,
    DocumentTypeRequests
} from "../requests/DocumentTypeRequests";

interface State {
    page: InputPage;
    documentTypes: DocumentType[] | null;
}

export class CreatePagePage extends React.Component<{}, State> {
    state: State = {
        page: Pages.createNew(),
        documentTypes: null
    };

    load = () => DocumentTypeRequests.list();

    render() {
        return (
            <DefaultPage title="Create new Page">
                <DataLoader
                    load={this.load}
                    render={(documentTypes: DocumentType[]) => (
                        <Panel>
                            <PageEditor
                                page={this.state.page}
                                documentTypes={documentTypes}
                                onChange={page => this.setState({ page })}
                            />
                        </Panel>
                    )}
                />
            </DefaultPage>
        );
    }
}
