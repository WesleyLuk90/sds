import { Paper } from "@material-ui/core";
import * as React from "react";
import { theme } from "../app/Application";

export class Panel extends React.Component {
    render() {
        return (
            <Paper style={{ padding: theme.spacing.unit * 3 }}>
                {this.props.children}
            </Paper>
        );
    }
}
