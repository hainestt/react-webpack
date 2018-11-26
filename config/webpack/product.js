
const BaseConfig = require('./base')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

class ProductConfig extends BaseConfig {
    constructor () {
        super ()

        this.config = {
            optimization: {
                optimization: {
                    splitChunks: this.splitChunks
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
                    }),

                    new OptimizeCSSAssetsPlugin({})
                ]
            }
        }
    }
}

module.exports = ProductConfig