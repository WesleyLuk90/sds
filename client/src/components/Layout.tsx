import * as React from "react";
import * as styles from "./Layout.css";

interface Props {
    title: React.ReactNode;
}

export class Layout extends React.Component<Props> {
    render() {
        return (
            <div className={styles.layout}>
                <h2>{this.props.title}</h2>
                {this.props.children}
            </div>
        );
    }
}
