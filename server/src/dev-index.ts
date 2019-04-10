import * as webpack from "webpack";
import * as middleware from "webpack-dev-middleware";
import * as hotMiddleware from "webpack-hot-middleware";
import { Server } from "./http/Server";

async function main() {
    const server = await Server.create();
    const withUI = !process.argv.includes("--no-webpack");
    if (withUI) {
        const compiler = webpack(require("../../client/webpack.dev.config.js"));
        server.addMiddleware(
            middleware(compiler, {
                publicPath: "/"
            })
        );
        server.addMiddleware(hotMiddleware(compiler));
    }
    await server.start();
    if (withUI) {
        require("open")("http://localhost:3000");
    }
}

main().catch(e => {
    console.error(e);
    process.exit(1);
});
