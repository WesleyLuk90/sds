import * as express from "express";
import * as graphqlHTTP from "express-graphql";
import { RequestHandler } from "express-serve-static-core";
import { Schema } from "../query/Schema";

export class Server {
    app: express.Express;
    port = 3000;

    constructor() {
        this.app = express();

        this.app.use(
            "/api/query",
            graphqlHTTP({
                schema: Schema,
                rootValue: {
                    documentTypes: async () => [
                        { id: "a", name: "A" },
                        { id: "b", name: "B" }
                    ],
                    err: async () => {
                        throw new Error("bar");
                    }
                },
                graphiql: true
            })
        );
    }

    addMiddleware(middleware: RequestHandler) {
        this.app.use(middleware);
    }

    start() {
        this.app.listen(this.port, () =>
            console.log(`Example app listening on port ${this.port}!`)
        );
    }
}
