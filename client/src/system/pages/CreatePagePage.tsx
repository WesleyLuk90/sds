import * as React from "react";
import { DefaultPage } from "../../components/DefaultPage";
import { Panel } from "../../components/panels/Panel";
import { PageEditor } from "../../pages/components/PageEditor";
import { Pages } from "../../pages/Pages";
import { InputPage } from "../../__generated__/globalTypes";

interface State {
    page: InputPage;
}

export class CreatePagePage extends React.Component<{}, State> {
    state: State = {
        page: Pages.createNew()
    };

    render() {
        return (
            <DefaultPage title="Create new Page">
                <Panel>
                    <PageEditor
                        page={this.state.page}
                        onChange={page => this.setState({ page })}
                    />
                </Panel>
            </DefaultPage>
        );
    }
}
