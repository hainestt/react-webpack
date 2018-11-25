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
            
        }
    }
}