import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import fs from 'fs'
import winstonLogger from '../utils/winstonLogger'

// main Express application/router 
const app = express()
app.
    use(cookieParser()).
    use(bodyParser.json()).
    use(bodyParser.urlencoded({
        extended: true//
    }))

// On conditional require
const wrapper = {

    requireF: (modulePath) => {

        try {

            return require (modulePath)

        } catch (err) {

            winstonLogger.log({
                level: 'error',
                message: `requireF(): The file ${modulePath} could not be loaded :: ${err.stack}`
            })

            return false

        }

    }

}

// CSRFTOKEN GENERATION ENDPOINT
// app.get("/csrfTOKEN", routeUtils.csrfMiddleware,function(req, res) {
//     //    send the token to client
//       let _token = req.csrfToken()
//       winstonLogger.info(`GENERATED_CSRF: ${_token}`)
//       res.json({ csrfToken: _token})
// })

app.get("/",function(req, res) {// For Debugging
      res.json({ 
            Status: "Server UP!"
        })
})

// 
const routersPath = '../routerServices/'
const routerList = fs
        .readdirSync(`${__dirname}//${routersPath}`)
        .filter((filename) => filename.match(/\.js$/))

let index_ = 0
//
routerList.forEach((routerName) => {

    winstonLogger.info(`routerService[${index_}]: ${routerName}`)
    index_ += 1
    routerName.trim()
    routerName.split('.')[0]
    routerName = `../routerServices/${routerName}`

    const routerModule = wrapper.requireF(routerName)
    app.use(routerModule)

})

module.exports = app