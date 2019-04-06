import MuiTable from "@material-ui/core/Typography";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import * as React from "react";

interface Props<R> {
    rows: R[];
    rowKey: (row: R, index: number) => string | number;
    columns: TableColumn<R>[];
}

export class TableColumn<R> {
    static create<R>(
        id: string,
        header: React.ReactNode,
        formatter: (row: R) => React.ReactNode
    ): TableColumn<R> {
        return new TableColumn(id, header, formatter);
    }

    constructor(
        readonly id: string,
        readonly header: React.ReactNode,
        readonly formatter: (row: R) => React.ReactNode
    ) {}
}

export class Table<R> extends React.Component<Props<R>> {
    render() {
        return (
            <MuiTable style={{ width: "100%" }}>
                <TableHead>
                    <TableRow>
                        {this.props.columns.map(col => (
                            <TableCell key={col.id}>{col.header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.rows.map((row, index) => (
                        <TableRow key={this.props.rowKey(row, index)}>
                            {this.props.columns.map(col => (
                                <TableCell key={col.id}>
                                    {col.formatter(row)}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </MuiTable>
        );
    }
}
