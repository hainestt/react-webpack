
const BaseConfig = require('./webpack.base.config')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

class ProductConfig extends BaseConfig {
    constructor () {
        super ()

        this.config = {
            optimization: {
                optimization: {
                    splitChunks: {
                        chacheGroups: {
                            vendor: {
                                name: 'vendor',
                                test: /[\\/]node_modules[\\/]/,
                                chunks: 'all',
                                minSize: 1
                            }
                        }
                    }
                },
                minimizer: [
                    new UglifyJsPlugin({
                        test: /\.js$/,
                        uglifyOptions: {
                            warnings: false,
                            compress: {
                                drop_debugger: false
                            }
                        }
                    })
                ]
            }
        }
    }
}

let a = new ProductConfig()
console.log(a)