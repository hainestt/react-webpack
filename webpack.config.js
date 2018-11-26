const webpackConfig = require('./config/webpack')
const defaultEnv = 'develop'

module.exports = env => { //'env' is passed from command line
    let CurrentConfig

    if (!!webpackConfig[env]) {
        CurrentConfig = webpackConfig[env]
    } else {
        CurrentConfig = webpackConfig[defaultEnv]
    }

    let configInstance = new CurrentConfig()

    return configInstance.config

}