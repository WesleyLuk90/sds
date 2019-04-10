import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as React from "react";
import { Panel } from "./Panel";
import { ErrorDisplay } from "../ErrorDisplay";

interface Props {
    dirty: boolean;
    onSave: () => Promise<void>;
}

interface State {
    saving: boolean;
    error: Error | null;
}

export class SavePanel extends React.Component<Props, State> {
    state: State = {
        saving: false,
        error: null
    };

    onSave = async () => {
        try {
            this.setState({ saving: true, error: null });
            await this.props.onSave();
        } catch (e) {
            this.setState({ error: e });
        } finally {
            this.setState({ saving: false });
        }
    };

    renderSave() {
        if (this.state.saving) {
            return <CircularProgress size={30} />;
        }
        return null;
    }

    renderError() {
        if (this.state.error == null) {
            return null;
        }
        return <ErrorDisplay error={this.state.error} />;
    }

    renderFooter() {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center"
                }}
            >
                {this.renderError()}
                {this.renderSave()}
                <Button
                    onClick={this.onSave}
                    disabled={!this.props.dirty || this.state.saving}
                >
                    Save
                </Button>
            </div>
        );
    }

    render() {
        return (
            <Panel footer={this.renderFooter()}>{this.props.children}</Panel>
        );
    }
}
