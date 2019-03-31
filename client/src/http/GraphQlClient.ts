const query = gql`
    query GetDocumentTypes {
        documentTypes {
            id
            name
        }
    }
`;

const query2 = gql`
    mutation Bar($d: InputDocumentType!) {
        createDocumentType(documentType: $d) {
            id
        }
    }
`;

export function gql(strings: TemplateStringsArray): string {
    return strings.join("");
}

export class GraphQlClient {
    static default() {
        return new GraphQlClient();
    }
}
