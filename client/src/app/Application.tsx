import * as React from "react";
import * as styles from "./Application.css";

interface Props {
    compiler: string;
    framework: string;
}

export class Application extends React.Component<Props, {}> {
    render() {
        return (
            <h1 className={styles.nav}>
                Application from {this.props.compiler} and{" "}
                {this.props.framework}!
            </h1>
        );
    }
}
