import { Typography } from "@material-ui/core";
import * as React from "react";

export class SectionHeader extends React.Component {
    render() {
        return <Typography variant="h4">{this.props.children}</Typography>;
    }
}
