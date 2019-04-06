import { Typography } from "@material-ui/core";
import { TypographyProps } from "@material-ui/core/Typography";
import * as React from "react";

export class Title extends React.Component<TypographyProps> {
    render() {
        return (
            <Typography variant="subtitle1" {...this.props}>
                {this.props.children}
            </Typography>
        );
    }
}
