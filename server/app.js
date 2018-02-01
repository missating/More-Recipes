import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';

import routes from './routes';

dotenv.config();

const port = (process.env.PORT || 3000);

// Set up the express app
const app = express();

// Log requests to the console
app.use(logger('dev'));

const publicPath = express.static(path.join(__dirname, '../build'));

app.use('/', publicPath);

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const compiler = webpack(webpackConfig);

if (process.env.NODE_ENV === 'development') {
  app.use(webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
  }));

  app.use(webpackHotMiddleware(compiler));
}

routes(app);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// returns 404 for unknown routes
app.all('*', (req, res) => {
  res.status(404).send('The api route you requested does not exist');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

export default app;
