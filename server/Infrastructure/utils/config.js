import winstonLogger from './winstonLogger'

/**
 * #k_infinity3
 *
 * config : () :
 *      load from .env with dotenv
 */

const path = require('path')
const fs = require('fs')

require('dotenv').config({path: path.join(__dirname, '../../../../.env')})

const config = {

  serverPort: process.env.serverPORT

}

export default config