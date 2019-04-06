import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router";
import { DocumentsListPage } from "./pages/DocumentsListPage";

export class DocumentsRoutes extends React.Component<RouteComponentProps<any>> {
    render() {
        const base = this.props.match.path;
        return (
            <Switch>
                <Route
                    path={base + "/list/:id"}
                    component={DocumentsListPage}
                />
            </Switch>
        );
    }
}
