import * as React from "react";
import { Route, Switch } from "react-router";
import { ConfigurationPage } from "../system/ConfigurationPage";
import { DocumentTypesPage } from "../system/DocumentTypesPage";
import { HomePage } from "./HomePage";

export class Content extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route
                    path="/system/document-types"
                    component={DocumentTypesPage}
                />
                <Route
                    path="/system/configuration"
                    component={ConfigurationPage}
                />
            </Switch>
        );
    }
}
