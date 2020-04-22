import express from 'express';
import dotenv from 'dotenv-safe';

import server from './server/index.mjs';
import LoggerSvc from './lib/services/LoggerSvc.mjs';

dotenv.config();

const PORT = process.env.PORT || 3000;
const logger = new LoggerSvc('server');
const app = express();

app.use((req, res, next) => {
  server(req, res, next);
});

app.listen(PORT, () => {
  logger.info(`Server loaded and is running on :${PORT}`);
  app.emit('listened', null);
});

export default app;
