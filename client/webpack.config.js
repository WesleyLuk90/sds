const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    mode: "production",
    entry: [path.join(__dirname, "./src/app/Bootstrapper.tsx")],
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist")
    },

    devtool: "inline-source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    { loader: "babel-loader" },
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true
                        }
                    }
                ],
                exclude: /node_modules/
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.css$/,
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
    optimization: {
        usedExports: true
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src/index.html")
        })
    ]
};
