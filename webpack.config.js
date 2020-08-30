const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index__bundle.js'
    },
    mode: 'development',
    module: {
        rules: [
            {test: /\.(js)$/, use: 'babel-loader'},
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test:  /\.s[ac]ss$/i, use: ['style-loader', 'css-loader', 'sass-loader']}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        })
    ]
}