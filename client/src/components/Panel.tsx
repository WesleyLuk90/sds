import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import * as React from "react";
import { theme } from "../app/Application";

interface Props {
    footer?: React.ReactNode;
}

export class Panel extends React.Component<Props> {
    renderFooter() {
        if (this.props.footer) {
            return (
                <>
                    <Divider />
                    <div style={{ padding: theme.spacing.unit * 3 }}>
                        {this.props.footer}
                    </div>
                </>
            );
        }
        return null;
    }

    render() {
        return (
            <Paper>
                <div style={{ padding: theme.spacing.unit * 3 }}>
                    {this.props.children}
                </div>
                {this.renderFooter()}
            </Paper>
        );
    }
}
