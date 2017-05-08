"use strict";

module.exports = {
    entry: "./Content/Scripts/App.jsx",
    output: {
        filename: "./Content/Scripts/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["es2015", "react"]
                }
            }
        ]
    }
};