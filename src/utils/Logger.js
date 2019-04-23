// Provides convinent method for local and remote logging.
// automatically sends defined levels to roll bar server

import { Rollbar, Client, Configuration } from 'winston-transport-rollbar';
import Configs from '../configs/Configs';

const winston = require('winston');

/*
const rollbar = new Client(new Configuration(Configs.ROLLBAR_ACCESS_TOKEN, {
  payload: {
    client: {
      JavaScript: {
        // source_map_enabled: true,
        // code_version: '1234566.android',
        environment: '',
      },
    },
  },
}));
*/

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
} else {
  const options = {
    accessToken: Configs.ROLLBAR_ACCESS_TOKEN,
    environment: 'production',
    reportLevel: 'error',
  };
  winston.add(winston.transports.Rollbar, options);
}
// which to send with rollbar?
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
