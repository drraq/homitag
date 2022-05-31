const path = require('path')
const { createLogger, format, transports } = require('winston')
const { combine, timestamp, printf, colorize } = format

const logFormat = printf(({ level, message, timestamp }) => {
  return `[${level}] ${timestamp} ${message}`
})

const filename = path.resolve('logs', 'app.log')

const logger = createLogger({
  transports: [
      new transports.Console({
          level: 'debug',
          handleExceptions: true,
          format: combine(
              colorize(),
              timestamp(),
              logFormat
          )
      }),
      new transports.File({
          level: 'info',
          handleExceptions: true,
          filename,
          maxsize: 5242880,             // 5 MB
          maxFiles: 50,
          format: combine(
            timestamp(),
            logFormat
          )
      })
    ],
    exitOnError: false
})

// Will be used by Morgan
logger.stream = {
    write: function(message) {
      // use the 'info' log level so the output will be picked up by both transports (file and console)
      logger.info(message)
    }
  }


module.exports = logger