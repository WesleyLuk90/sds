import * as React from "react";
import * as styles from "./VerticalLayout.css";

export class VerticalLayout extends React.Component {
    render() {
        return <div className={styles.layout}>{this.props.children}</div>;
    }
}
