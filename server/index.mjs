import express from 'express';
import timeout from 'connect-timeout';
import bodyParser from 'body-parser';
import toInteger from 'lodash';
import { handleError } from '../lib/utils/express.mjs';
import routes from './routes.mjs';

const app = express();
const EXPRESS_TIMEOUT = toInteger(process.env.EXPRESS_TIMEOUT) || 2000;
const haltOnTimedout = (req, _res, next) => {
  if (!req.timedout) {
    next();
  }
}

app.use(bodyParser.json());
app.use(timeout(EXPRESS_TIMEOUT));
app.use(haltOnTimedout);
app.enable('case sensitive routing');
app.enable('strict routing');

app.use(routes);

app.use(handleError);

export default app;
