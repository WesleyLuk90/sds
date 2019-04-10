import { Typography } from "@material-ui/core";
import * as React from "react";

export class ErrorDisplay extends React.Component<{ error: Error }> {
    formatError() {
        const error: any = this.props.error;
        try {
            if (
                error.response &&
                error.response.data &&
                error.response.data.errors
            ) {
                return error.response.data.errors
                    .map((e: any) => e.message)
                    .join(". ");
            }
        } catch (e) {
            console.error(e);
        }
        return error.message || "An unexpected error occured";
    }

    render() {
        return <Typography color="error">{this.formatError()}</Typography>;
    }
}
