const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');


module.exports = {
    entry: './src/js/main.js',
    output: {
      filename: 'js/[name].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.njk$/,
                use: [
                    {
                        loader: 'simple-nunjucks-loader',
                        options: {
                            searchPaths: [
                                './src/partials',
                            ],
                            assetsPaths: [
                                'src/images',

                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[ext]',
                      },
                }]
            },
        ]
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './src/pages/index.njk',
            templateParameters: {
                username: 'Michael'
            }
        }),
        new HTMLWebpackPlugin({
            template: './src/pages/about.njk',
            filename: 'about.html',
            templateParameters: {
                username: 'Michael'
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
    ],
    devServer: {
        watchFiles: ['src/**/*.njk',],
        allowedHosts: "all"
    },
}
