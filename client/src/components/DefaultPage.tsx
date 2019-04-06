import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { theme } from "../app/Application";
import * as styles from "./DefaultPage.css";

interface Props {
    title: React.ReactNode;
}

export class DefaultPage extends React.Component<Props> {
    render() {
        return (
            <div style={{ padding: theme.spacing.unit * 3 }}>
                <AppBar position="absolute" className={styles.appBar}>
                    <Toolbar>
                        <Typography component="h1" variant="h6" color="inherit">
                            {this.props.title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={styles.spacer} />
                {this.props.children}
            </div>
        );
    }
}
