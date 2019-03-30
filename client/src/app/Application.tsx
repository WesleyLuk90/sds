import * as React from "react";
import * as styles from "./Application.css";
import "./globals.css";
import {
    Navbar,
    NavbarGroup,
    NavbarHeading,
    Alignment,
    NavbarDivider,
    Button,
    Classes
} from "@blueprintjs/core";

export class Application extends React.Component {
    render() {
        return (
            <div className={styles.application}>
                <Navbar>
                    <NavbarGroup align={Alignment.LEFT}>
                        <NavbarHeading>Blueprint</NavbarHeading>
                        <NavbarDivider />
                        <Button
                            className={Classes.MINIMAL}
                            icon="home"
                            text="Home"
                        />
                        <Button
                            className={Classes.MINIMAL}
                            icon="document"
                            text="Files"
                        />
                    </NavbarGroup>
                </Navbar>
            </div>
        );
    }
}
