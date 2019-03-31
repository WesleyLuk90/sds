import { HTMLTable } from "@blueprintjs/core";
import * as React from "react";
import { Layout } from "../components/Layout";
import {
    DocumentType,
    DocumentTypeRequests
} from "./requests/DocumentTypeRequests";

interface State {
    documentTypes: DocumentType[];
}

export class DocumentTypesPage extends React.Component<{}, State> {
    state: State = {
        documentTypes: []
    };

    async componentDidMount() {
        this.setState({ documentTypes: await DocumentTypeRequests.list() });
    }

    render() {
        return (
            <Layout title="Document Types">
                <HTMLTable style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>Project</th>
                            <th>Description</th>
                            <th>Technologies</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Blueprint</td>
                            <td>CSS framework and UI toolkit</td>
                            <td>Sass, TypeScript, React</td>
                        </tr>
                        <tr>
                            <td>TSLint</td>
                            <td>Static analysis linter for TypeScript</td>
                            <td>TypeScript</td>
                        </tr>
                        <tr>
                            <td>Plottable</td>
                            <td>
                                Composable charting library built on top of D3
                            </td>
                            <td>SVG, TypeScript, D3</td>
                        </tr>
                    </tbody>
                </HTMLTable>
            </Layout>
        );
    }
}
