import * as React from "react";

interface Props {
    compiler: string;
    framework: string;
}

export class Application extends React.Component<Props, {}> {
    render() {
        return (
            <h1>
                Application from {this.props.compiler} and{" "}
                {this.props.framework}!
            </h1>
        );
    }
}
