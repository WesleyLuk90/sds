import { AppBar, Toolbar, Typography } from "@material-ui/core";
import * as React from "react";
import * as styles from "./Layout.css";

interface Props {
    title: React.ReactNode;
}

export class Layout extends React.Component<Props> {
    render() {
        return (
            <div className={styles.layout}>
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
