import * as express from "express";
import * as graphqlHTTP from "express-graphql";
import { RequestHandler } from "express-serve-static-core";
import { QueryRoot, Schema } from "../query/Schema";

export class Server {
    app: express.Express;
    port = 3000;

    static async create(): Promise<Server> {
        const queryRoot = await QueryRoot.create();
        return new Server(queryRoot);
    }

    constructor(private queryRoot: QueryRoot) {
        this.app = express();
        this.app.use(
            "/api/query",
            graphqlHTTP({
                schema: Schema,
                rootValue: queryRoot,
                graphiql: true,
                formatError: error => {
                    console.error({
                        message: error.message,
                        locations: error.locations,
                        path: error.path,
                        stack: error.stack ? error.stack.split("\n") : [],
                        originalError: error.originalError
                    });
                    return {
                        message: error.message,
                        locations: error.locations,
                        path: error.path
                    };
                }
            })
        );
    }

    addMiddleware(middleware: RequestHandler) {
        this.app.use(middleware);
    }

    async start() {
        return new Promise(resolve => {
            this.app.listen(this.port, () => {
                console.log(`Example app listening on port ${this.port}!`);
                resolve();
            });
        });
    }
}
