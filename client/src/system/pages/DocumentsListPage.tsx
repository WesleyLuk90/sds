import * as React from "react";
import { DefaultPage } from "../../components/DefaultPage";
import { RouteComponentProps } from "react-router";

interface State {
    documents: Document[];
}

export class DocumentsListPage extends React.Component<
    RouteComponentProps<{ id: string }>
> {
    render() {
        return (
            <DefaultPage title="Documents">
                {this.props.match.params.id}
            </DefaultPage>
        );
    }
}
