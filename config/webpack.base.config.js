'use strict'

const path = require('path')
const fs = require('fs')

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
            
            plugins: []


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

}

module.exports = BaseConfig


