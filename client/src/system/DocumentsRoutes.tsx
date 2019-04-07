import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router";
import { DocumentsListPage } from "./pages/DocumentsListPage";
import { CreateDocumentPage } from "./pages/CreateDocumentPage";

export class DocumentsRoutes extends React.Component<RouteComponentProps<any>> {
    render() {
        const base = this.props.match.path;
        return (
            <Switch>
                <Route
                    path={base + "/list/:id"}
                    component={DocumentsListPage}
                />
                <Route
                    path={base + "/create/:id"}
                    component={CreateDocumentPage}
                />
            </Switch>
        );
    }
}
