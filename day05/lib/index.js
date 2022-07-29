const Compiler = require('./compiler')
const options = require('../simplewebpack.config')
new Compiler(options).run()