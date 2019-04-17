import Button from "@material-ui/core/Button";
import AddBox from "@material-ui/icons/AddBox";
import * as React from "react";

interface Props {
    onClick: () => void;
}

export class AddButton extends React.Component<Props> {
    render() {
        return (
            <Button onClick={this.props.onClick}>
                <AddBox /> {this.props.children}
            </Button>
        );
    }
}
