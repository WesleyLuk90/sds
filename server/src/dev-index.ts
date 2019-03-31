import * as webpack from "webpack";
import * as middleware from "webpack-dev-middleware";
import * as hotMiddleware from "webpack-hot-middleware";
import { Server } from "./http/Server";

async function main() {
    const server = await Server.create();
    if (!process.argv.includes("--no-webpack")) {
        const compiler = webpack(require("../../client/webpack.dev.config.js"));
        server.addMiddleware(
            middleware(compiler, {
                publicPath: "/"
            })
        );
        server.addMiddleware(hotMiddleware(compiler));
    }
    server.start();
}

main().catch(e => {
    console.error(e);
    process.exit(1);
});
