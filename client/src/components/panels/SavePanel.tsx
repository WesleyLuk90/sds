import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as React from "react";
import { Panel } from "./Panel";

interface Props {
    dirty: boolean;
    onSave: () => Promise<void>;
}

interface State {
    saving: boolean;
}

export class SavePanel extends React.Component<Props, State> {
    state: State = {
        saving: false
    };

    onSave = async () => {
        try {
            this.setState({ saving: true });
            await this.props.onSave();
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

    renderFooter() {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center"
                }}
            >
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
