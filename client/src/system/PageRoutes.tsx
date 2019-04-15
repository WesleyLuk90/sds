import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router";
import { CreatePagePage } from "./pages/CreatePagePage";

export class PageRoutes extends React.Component<RouteComponentProps<any>> {
    render() {
        const base = this.props.match.path;
        return (
            <Switch>
                <Route path={base + "/create"} component={CreatePagePage} />
            </Switch>
        );
    }
}
