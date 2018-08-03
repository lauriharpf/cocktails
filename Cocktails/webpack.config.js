"use strict";

module.exports = {
    entry: "./Content/Scripts/App.jsx",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                } 
            }
        ]
    }
};