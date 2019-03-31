import * as React from "react";
import { Route, Switch } from "react-router";
import { ConfigurationPage } from "../system/ConfigurationPage";
import { DocumentTypesRoutes } from "../system/DocumentTypesRoutes";
import { HomePage } from "./HomePage";

export class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route
                    path="/system/document-types"
                    component={DocumentTypesRoutes}
                />
                <Route
                    path="/system/configuration"
                    exact
                    component={ConfigurationPage}
                />
                <Route path="/" exact component={HomePage} />
            </Switch>
        );
    }
}
