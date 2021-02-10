const { createLogger, transports, format } = require('winston');
require('winston-mongodb');
require('dotenv').config();

const logger = createLogger({
  transports: [
    new transports.Console({
      levels: {
        info: 0,
        error: 2,
      },
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.MongoDB({
      levels: {
        info: 0,
        error: 2,
      },
      db: process.env.DB_CONNECTION,
      options: {
        useUnifiedTopology: true,
      },
      collection: 'user-activity-log',
      format: format.combine(format.timestamp(), format.json()),
      metaKey: 'meta',
    }),
  ],
});

module.exports = logger;
