'use strict'

const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const BaseConfig = require('./webpack.base.config')

class DevConfig extends BaseConfig {
    constructor () {
        super()
        this.config = {
            devtool: 'cheap-module-source-map',
            mode: 'development',
            devServer: {
                host: '127.0.0.1',
                port: 3038,
                compress: true,
                open: true, // open browser
                headers: {},
                proxy: {} // proxy, for mock server

            },
            optimization: {
                splitChunks: this.splitChunks
            },
            
        }
    }
}

module.exports = DevConfig