import * as React from "react";
import { loader } from "./Loader";
import { ErrorDisplay } from "./ErrorDisplay";
import Paper from "@material-ui/core/Paper";
import { theme } from "../app/Application";

interface Props<T> {
    load: () => Promise<T>;
    render: (data: T) => React.ReactNode;
}

interface State<T> {
    data: T | null;
    error: Error | null;
}

export class DataLoader<T> extends React.Component<Props<T>, State<T>> {
    state: State<T> = {
        data: null,
        error: null
    };

    async componentDidMount() {
        try {
            this.setState({ data: await this.props.load() });
        } catch (e) {
            this.setState({ error: e });
        }
    }

    render() {
        if (this.state.error != null) {
            return (
                <Paper
                    style={{
                        margin: `${theme.spacing.unit * 2}px auto`,
                        padding: theme.spacing.unit * 2,
                        maxWidth: 500
                    }}
                >
                    <ErrorDisplay error={this.state.error} />
                </Paper>
            );
        }
        return loader(this.state.data, this.props.render);
    }
}
