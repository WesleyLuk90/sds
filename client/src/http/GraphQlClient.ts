import axios from "axios";

export function gql(strings: TemplateStringsArray): string {
    return strings.join("");
}

export class GraphQlClient {
    static async query<R = {}, A = {}>(query: string, args?: A): Promise<R> {
        const response = await axios.post("/api/query", {
            query: query,
            args: args
        });
        return response.data.data;
    }
}
