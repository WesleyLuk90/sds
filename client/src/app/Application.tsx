import * as React from "react";
import { HashRouter } from "react-router-dom";
import "./globals.css";
import { Navigation } from "./Navigation";
import { Routes } from "./Routes";

export class Application extends React.Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <Navigation />
                    <Routes />
                </HashRouter>
            </div>
        );
    }
}
