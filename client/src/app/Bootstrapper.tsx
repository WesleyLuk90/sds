import * as React from "react";
import * as ReactDOM from "react-dom";

import { Application } from "./Application";

ReactDOM.render(
    <Application compiler="TypeScript" framework="React" />,
    document.getElementById("application-container")
);
