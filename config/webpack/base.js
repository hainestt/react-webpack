'use strict'

const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


class BaseConfig {
    constructor () {
        this._config = {}
        this._entry = {}
    }

    // properties
    get config () {
        return this._config
    }

    set config (data) {
        this._config = Object.assign({}, this.defaultSettings, data)
    }

    get splitChunks () {
        return {
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    minSize: 1
                }
            }
        }
    }

    get defaultSettings () {

        return {
            devtool: 'eval',
            entry: 'index.js',
            output: {
                path: path.resolve(process.cwd(), 'dist/js/'),
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
                        test: /\.(scss|css)$/,
                        use: [
                            {
                                loader: process.env.NODE_ENV == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader
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
            
            plugins: [
                ...this.htmlConfig(),
                new MiniCssExtractPlugin({
                    filename: '[name].css',
                    chunkFilename: '[id].css'
                })
            ]


        }
    }

    get entry () {
        this._entry = Object.assign({}, this.getEntry(`${this.srcPath}/pages`))
        return this._entry
    }

    set entry (entry = {}) {
        this._entry = Object.assign({}, this._entry, entry)
    }

    get srcPath () {
        return path.join(__dirname, '../src')
    }

    // methods
    getFilePath (path) {
        let isExist = fs.existsSync(path)
        let pathArr = []

        if (isExist) {
            let files = fs.readdirSync(path)

            files.map(item => {
                let currentPath = `${path}/${item}`
                let isDirectory = fs.statSync(currentPath).isDirectory()

                if (isDirectory) {
                    pathArr.push(item)
                }
            })
        }

        return pathArr
    }

    getEntry (path) {
        let entry = {}

        this.getFilePath(path).map(item => {
            entry[`${item}/${item}`] = `${path}/${item}/index.js`
        })

        return entry
    }

    htmlConfig () {
        let htmlArr = []
        this.getFilePath(this.srcPath).map(item => {
            let infoData = JSON.parse(fs.readFileSync(`${this.srcPath}/${item}/index.json`, 'utf-8'))
            htmlArr.push(new HtmlWebpackPlugin({
                title: !!infoData.title ? infoData.title: '',
                meta: {
                    keywords: !!infoData.keywords ? infoData.keywords : '',
                    description: !!infoData.description ? infoData.description : ''
                },
                template: `${this.srcPath}/app.html`,
                filename: `${item}/index.html`,
                chunks: [`${item}/${item}`],
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                }

            }))
        })

       return htmlArr 
    }

}

module.exports = BaseConfig


