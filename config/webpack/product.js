
const BaseConfig = require('./base')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

class ProductConfig extends BaseConfig {
    constructor () {
        super ()

        // this.config = Object.assign(this.config, {
        //     devtool: 'source-map',
        //     mode: 'production',
        //     optimization: {
        //         splitChunks: this.splitChunks,
        //         minimizer: [
        //             new UglifyJsPlugin({
        //                 test: /\.js$/,
        //                 uglifyOptions: {
        //                     warnings: false,
        //                     compress: {
        //                         drop_debugger: true
        //                     }
        //                 }
        //             })
        //         ]
        //     },
        //     plugins: [
        //         new OptimizeCSSAssetsPlugin({})
        //     ]
        // })

        this.config = {
            devtool: 'source-map',
            mode: 'production',
            optimization: {
                splitChunks: this.splitChunks,
                minimizer: [
                    new UglifyJsPlugin({
                        test: /\.js$/,
                        uglifyOptions: {
                            warnings: false,
                            compress: {
                                drop_debugger: true
                            }
                        }
                    }),
                    new OptimizeCSSAssetsPlugin({})
                ]
            },
        }
    }
}

module.exports = ProductConfig