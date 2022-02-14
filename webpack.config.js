const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
    mode: "development", //actual service? : production
    devtool: "eval", // hidden-source-map
    resolve: {
        extensions: ['.js', '.jsx']
    }, //file formats
    entry: {
        app: ['./client', './tictactoe']

    }, //write all files name that you want to combine
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/preset-env', '@babel/preset-react'
                ],
                plugins: ['@babel/plugin-proposal-class-properties',
                    'react-refresh/babel'
                ]
            }
        }]
    },
    plugins: [new RefreshWebpackPlugin()],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/dist'
    },
    devServer: {
        devMiddleware: {
            publicPath: '/dist'
        },
        static: {
            directory: path.resolve(__dirname)
        },
        hot: true
    }
    // combined file info
}