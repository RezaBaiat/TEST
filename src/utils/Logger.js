const winston = require('winston');


/**
 @see https://github.com/winstonjs/winston
 */
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export default class Logger {
  static error(message : string) {
    logger.error(message);
  }

  static warn(message : string) {
    logger.warn(message);
  }

  static info(message : string) {
    logger.info(message);
  }

  static verbose(message : string) {
    logger.verbose(message);
  }

  static debug(message : string) {
    logger.debug(message);
  }

  static silly(message : string) {
    logger.silly(message);
  }
}
