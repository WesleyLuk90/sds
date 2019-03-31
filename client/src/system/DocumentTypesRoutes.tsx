import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router";
import { CreateDocumentTypePage } from "./CreateDocumentTypePage";
import { DocumentTypesPage } from "./DocumentTypesPage";

export class DocumentTypesRoutes extends React.Component<
    RouteComponentProps<any>
> {
    render() {
        const base = this.props.match.path;
        return (
            <Switch>
                <Route
                    path={base + "/create"}
                    component={CreateDocumentTypePage}
                />
                <Route path={base + "/"} component={DocumentTypesPage} />
            </Switch>
        );
    }
}
