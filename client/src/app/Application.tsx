import { CssBaseline } from "@material-ui/core";
import {
    createGenerateClassName,
    createMuiTheme,
    jssPreset,
    MuiThemeProvider
} from "@material-ui/core/styles";
import { create } from "jss";
import * as React from "react";
import JssProvider from "react-jss/lib/JssProvider";
import { HashRouter } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Routes } from "./Routes";

const generateClassName = createGenerateClassName();
const jss = create({
    ...jssPreset(),
    insertionPoint: "jss-insertion-point"
});
export const theme = createMuiTheme({
    typography: {
        useNextVariants: true
    },
    props: {
        MuiButtonBase: {
            disableRipple: true
        }
    }
});
export class Application extends React.Component {
    render() {
        return (
            <JssProvider jss={jss} generateClassName={generateClassName}>
                <MuiThemeProvider theme={theme}>
                    <div>
                        <CssBaseline />
                        <HashRouter>
                            <Navigation>
                                <Routes />
                            </Navigation>
                        </HashRouter>
                    </div>
                </MuiThemeProvider>
            </JssProvider>
        );
    }
}
