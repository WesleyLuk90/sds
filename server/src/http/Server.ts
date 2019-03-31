import * as express from "express";
import * as graphqlHTTP from "express-graphql";
import { RequestHandler } from "express-serve-static-core";
import { QueryRoot, Schema } from "../query/Schema";

export class Server {
    app: express.Express;
    port = 3000;

    constructor() {
        this.app = express();
    }

    async configureQuery() {
        const queryRoot = await QueryRoot.create();
        this.app.use(
            "/api/query",
            graphqlHTTP({
                schema: Schema,
                rootValue: queryRoot,
                graphiql: true
            })
        );
    }

    addMiddleware(middleware: RequestHandler) {
        this.app.use(middleware);
    }

    async start() {
        await this.configureQuery();
        this.app.listen(this.port, () =>
            console.log(`Example app listening on port ${this.port}!`)
        );
    }
}
