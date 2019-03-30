const webpack = require("webpack");
const base = require("./webpack.config.js");

base.mode = "development";
base.plugins.push(new webpack.HotModuleReplacementPlugin());
base.entry.unshift("webpack-hot-middleware/client?reload=true");

module.exports = base;
