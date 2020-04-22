import express from 'express';
import LoggerSvc from '../lib/services/LoggerSvc.mjs';
import routes from './config/routes.mjs';

const app = express();
const logger = new LoggerSvc('server/routes');

app.get('/', (_req, res) => {
  res.json({
    status: 'OK'
  });
});

routes.forEach(route => {
  const componentRoutesPath = `./components/${route.component}/routes.mjs`;
  import(componentRoutesPath)
    .then(componentRoutes => {
      logger.info(`Loading <${route.component}> component (${componentRoutesPath})`);
      app.use(route.route, componentRoutes.default);
    })
    .catch(err => logger.error(err))
});

export default app;
