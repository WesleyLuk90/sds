import { CircularProgress } from "@material-ui/core";
import * as React from "react";

export function loader<T>(
    value: T | null,
    render: (value: T) => React.ReactNode
): React.ReactNode {
    if (value == null) {
        return <CircularProgress />;
    } else {
        return render(value);
    }
}
