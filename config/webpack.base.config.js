'use strict'

const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

class BaseConfig {
    constructor () {
        this._config = {}
    }

    get config () {
        return this._config
    }

    set config (data) {
        this._config = Object.assign({}, this.defaultSettings, data)
    }



    get defaultSettings () {

        return {
            devtool: 'eval',
            entry: 'index.js',
            output: {
                path: path.join(__dirname, '../dist/js/'),
                publicPath: 'dist/js',
                filename: '[name].js',
                // chunkFilename: '[name].js'
                chunkFilename: '[name].[chunkhash].js'
            },
            module: {
                rules: [
                    {
                        enforce: 'pre',
                        test: /\.jsx?$/,
                        loader: 'eslint-loader'
                    },
                    {
                        test: /\.jsx?$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader'
                    },
                    {
                        test: /\.js$/,
                        loader: 'babel-loader'
                    },
                    {
                        test: /\.scss$/,
                        use: [
                            {
                                loader: 'style-loader'
                            }, 
                            {
                                loader: 'css-loader'
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: [
                                        require('autoprefixer')({
                                            browsers: ['last 5 versions']
                                        })
                                   ]
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {}
                            }
                        ]
                    },
                    {
                        test: /.(png|jpg|jpeg|gif)$/i,
                        use: [
                            {
                                loader: 'url-loader',
                                options: {
                                    limit: 8192  //8KB
                                }
                            }
                        ]
                        
                    }
                ]
            },
            splitChunks: {
                chacheGroups: {
                    vendor: {
                        name: 'vendor',
                        test: /[\\/]node_modules[\\/]/,
                        chunks: 'all',
                        minSize: 1
                    }
                }
            },
            plugins: []


        }
    }
}

module.exports = BaseConfig


