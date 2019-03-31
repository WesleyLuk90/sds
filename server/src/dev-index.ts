import * as webpack from "webpack";
import * as middleware from "webpack-dev-middleware";
import * as hotMiddleware from "webpack-hot-middleware";
import { Server } from "./http/Server";

const server = new Server();
if (!process.argv.includes("--no-webpack")) {
    const compiler = webpack(require("../../client/webpack.dev.config.js"));
    server.addMiddleware(
        middleware(compiler, {
            publicPath: "/"
        })
    );
    server.addMiddleware(hotMiddleware(compiler));
}
server.start().catch(e => {
    console.error(e);
    process.exit(1);
});
