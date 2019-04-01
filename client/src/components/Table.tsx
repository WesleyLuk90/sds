import { HTMLTable } from "@blueprintjs/core";
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
            <HTMLTable style={{ width: "100%" }} bordered>
                <thead>
                    <tr>
                        {this.props.columns.map(col => (
                            <th key={col.id}>{col.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {this.props.rows.map((row, index) => (
                        <tr key={this.props.rowKey(row, index)}>
                            {this.props.columns.map(col => (
                                <td key={col.id}>{col.formatter(row)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </HTMLTable>
        );
    }
}
