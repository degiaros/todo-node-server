
const path = require('path');
const { toInteger } = require('lodash');
const express = require('express');
const timeout = require('connect-timeout');
const bodyParser = require('body-parser');

require('dotenv-safe').config({
  path: path.join( __dirname, '.env'),
  example: path.join( __dirname, '.env.example'),
});

const PORT = process.env.PORT || 3000;
const EXPRESS_TIMEOUT = toInteger(process.env.EXPRESS_TIMEOUT) || 2000;

const LoggerSvc = require('./lib/core/logger');
const logger = new LoggerSvc('app');
const app = express();

const haltOnTimedout = (req, _res, next) => {
  if (!req.timedout) {
    next();
  }
}

app.use(timeout(EXPRESS_TIMEOUT));
app.use(bodyParser.json({ extended: true }))
app.use(haltOnTimedout);

app.get('/', (req, res) => {
  res.send('success');
})

app.listen(PORT, () => {
  logger.info(`Server loaded and is running on :${PORT}!`);
  app.emit('listened', null);
});


module.exports = { app };
