import { Button } from "@material-ui/core";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import * as styles from "./Actions.css";

interface Action {
    icon: string;
    label: string;
    path?: string;
}
interface Props extends RouteComponentProps<any> {
    actions: Action[];
}

export class BaseActions extends React.Component<Props> {
    click(action: Action) {
        if (action.path !== null) {
            this.props.history.push(action.path);
        }
    }

    render() {
        return (
            <div className={styles.actions}>
                {this.props.actions.map((action, i) => (
                    <Button
                        variant="contained"
                        key={i}
                        onClick={() => this.click(action)}
                    >
                        {action.label}
                    </Button>
                ))}
            </div>
        );
    }
}

export const Actions = withRouter<Props>(BaseActions);
