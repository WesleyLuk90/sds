import Link from "@material-ui/core/Link";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

interface Props {
    to: string;
}

export class AppLink extends React.Component<Props> {
    render() {
        return (
            <Link component={RouterLink as any} {...this.props}>
                {this.props.children}
            </Link>
        );
    }
}
