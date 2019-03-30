import { Server } from "./http/Server";
import * as webpack from "webpack";
import * as middleware from "webpack-dev-middleware";
import * as hotMiddleware from "webpack-hot-middleware";

const compiler = webpack(require("../../client/webpack.dev.config.js"));

const server = new Server();
server.addMiddleware(
    middleware(compiler, {
        publicPath: "/"
    })
);
server.addMiddleware(hotMiddleware(compiler));
server.start();
