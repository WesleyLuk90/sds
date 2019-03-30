import * as React from "react";
import { HashRouter } from "react-router-dom";
import { Content } from "./Content";
import "./globals.css";
import { Navigation } from "./Navigation";

export class Application extends React.Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <Navigation />
                    <Content />
                </HashRouter>
            </div>
        );
    }
}
