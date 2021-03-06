import * as React from "react";
import { Route, Switch } from "react-router";
import { DocumentsRoutes } from "../system/DocumentsRoutes";
import { DocumentTypesRoutes } from "../system/DocumentTypesRoutes";
import { HomePage } from "./HomePage";
import { PageRoutes } from "../system/PageRoutes";

export class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route
                    path="/system/document-types"
                    component={DocumentTypesRoutes}
                />
                <Route path="/system/documents" component={DocumentsRoutes} />
                <Route path="/system/pages" component={PageRoutes} />
                <Route path="/" component={HomePage} />
            </Switch>
        );
    }
}
