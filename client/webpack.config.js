const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    mode: "development",
    entry: [path.join(__dirname, "./src/app/Bootstrapper.tsx")],
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist")
    },

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                options: {
                    configFileName: path.join(__dirname, "tsconfig.json")
                }
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /globals\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.css$/,
                exclude: [path.join(__dirname, "src/app/globals.css")],
                use: [
                    "style-loader",
                    "css-modules-typescript-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "fonts/"
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src/index.html")
        })
    ]
};
