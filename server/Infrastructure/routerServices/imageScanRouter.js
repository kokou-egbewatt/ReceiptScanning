import express from 'express'
import winstonLogger from '../utils/winstonLogger'
import publicEnums from '../../app/publicEnums'
import routeUtils from '../utils/routerOptions'
import imageScan from '../../Libraries/image_scan'


  const imageScanRouter = express.Router()

  // OpenAccess_routes : don't require accessToken
  imageScanRouter.route('/ImageScan/').post(routeUtils.routerOptions.asyncMiddleware(async (req,res,next) => {

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))

  if(req.body.imageUrl)
  {
      const profiler = winstonLogger.startTimer()
    try{

      imageScan(req.body.imageUrl)

        res.json({
            state: 'success',
            statusCode: publicEnums.ImageScan_STATUS_CODES.INTERNAL_SERVER_ERROR,
            statusMessage: publicEnums.ImageScan_STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
            Value: ""
          })
      
    } catch(e){

      winstonLogger.error('ERROR: ')
      winstonLogger.error(e.stack)
      res.json({
        state: 'failure',
        statusCode: publicEnums.ImageScan_STATUS_CODES.INTERNAL_SERVER_ERROR,
        statusMessage: publicEnums.ImageScan_STATUS_MESSAGES.INTERNAL_SERVER_ERROR
      })

    }
            
      profiler.done({ message: 'End'})
      
      next()

  }else{

    res.json({
      state: 'failure',
      statusCode: publicEnums.ImageScan_STATUS_CODES.REQUEST_ERROR,
      statusMessage: publicEnums.ImageScan_STATUS_MESSAGES.INCORRECT_PARAMS
    })

  }

}))

module.exports = imageScanRouter