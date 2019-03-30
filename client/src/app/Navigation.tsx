import {
    Alignment,
    Button,
    Classes,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading
} from "@blueprintjs/core";
import * as React from "react";
import { Link } from "react-router-dom";

export class Navigation extends React.Component {
    render() {
        return (
            <Navbar>
                <NavbarGroup align={Alignment.LEFT}>
                    <NavbarHeading>
                        <Link to="/">Application</Link>
                    </NavbarHeading>
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
                <NavbarGroup align={Alignment.RIGHT}>
                    <Link to="/system/configuration">
                        <Button className={Classes.MINIMAL} icon="wrench" />
                    </Link>
                </NavbarGroup>
            </Navbar>
        );
    }
}
