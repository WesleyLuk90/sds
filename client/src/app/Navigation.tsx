import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import * as React from "react";
import { AppLink } from "./AppLink";
import * as styles from "./Navigation.css";

export class Navigation extends React.Component {
    render() {
        return (
            <div className={styles.navigation}>
                <Drawer variant="permanent" classes={{ paper: styles.drawer }}>
                    <List>
                        <AppLink to="/">
                            <ListItem button>
                                <ListItemText primary="Home" />
                            </ListItem>
                        </AppLink>
                        <ListItem button>
                            <ListItemText primary="Files" />
                        </ListItem>
                    </List>
                    <div className={styles.divider} />
                    <List>
                        <AppLink to="/system/document-types">
                            <ListItem button>
                                <ListItemText primary="Document Types" />
                            </ListItem>
                        </AppLink>
                        <ListItem button>
                            <ListItemText primary="Administration" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Profile" />
                        </ListItem>
                    </List>
                </Drawer>
                <div className={styles.main}>{this.props.children}</div>
            </div>
        );
    }
}
