import Paper from "@material-ui/core/Paper";
import * as React from "react";
import { theme } from "../../app/Application";

export class TablePanel extends React.Component<{ header: React.ReactNode }> {
    render() {
        return (
            <Paper>
                <div style={{ padding: theme.spacing.unit * 3 }}>
                    {this.props.header}
                </div>
                {this.props.children}
            </Paper>
        );
    }
}
