import winstonLogger from './winstonLogger'
import publicEnums from '../../app/publicEnums'


const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next)
}

 // Options
const routerOptions = {asyncMiddleware}

export default {
  routerOptions
}