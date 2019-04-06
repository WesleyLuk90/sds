import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router";
import { CreateDocumentTypePage } from "./pages/CreateDocumentTypePage";
import { DocumentTypesPage } from "./pages/DocumentTypesPage";
import { EditDocumentTypePage } from "./pages/EditDocumentTypePage";

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
                <Route
                    path={base + "/edit/:id"}
                    component={EditDocumentTypePage}
                />
                <Route path={base + "/"} component={DocumentTypesPage} />
            </Switch>
        );
    }
}
