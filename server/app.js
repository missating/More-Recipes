import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import routes from './routes';

dotenv.config();

// Set up the express app
const app = express();
app.use(cors());

// Log requests to the console
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

routes(app);

// returns 404 for unknown routes
app.all('*', (req, res) => {
  res.status(404).send('The api route you requested does not exist');
});


app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

export default app;
