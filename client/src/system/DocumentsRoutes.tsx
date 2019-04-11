import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router";
import { CreateDocumentPage } from "./pages/CreateDocumentPage";
import { DocumentsListPage } from "./pages/DocumentsListPage";
import { EditDocumentPage } from "./pages/EditDocumentPage";

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
                <Route
                    path={base + "/edit/:type/:id"}
                    component={EditDocumentPage}
                />
            </Switch>
        );
    }
}
