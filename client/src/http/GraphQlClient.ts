import axios from "axios";

export function gql(strings: TemplateStringsArray): string {
    return strings.join("");
}

export class GraphQlClient {
    static async query<R = {}, A = {}>(
        query: string,
        variables?: A
    ): Promise<R> {
        const response = await axios.post("/api/query", {
            query: query,
            variables: variables
        });
        return response.data.data;
    }
}
