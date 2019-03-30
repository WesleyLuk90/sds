import * as express from "express";
import { RequestHandler } from "express-serve-static-core";

export class Server {
    app: express.Express;
    port = 3000;

    constructor() {
        this.app = express();
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
