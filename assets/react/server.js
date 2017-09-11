import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Express from 'express';
import path from 'path';
import { Server } from 'http';
import routes from './routes';

// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/**
 * Public assets folder
 */
app.use(Express.static(path.join(__dirname, 'public')));

/**
 * Routing and rendering.
 */
app.get('*', (req, res) => {
  match({
    routes,
    location: req.url,
  }, (err, redirectLocation, renderProps) => {
    let markup;
    // in case of error display the error message
    if (err) {
      return res.status(500).send(err.message);
    }

    // in case of redirect propagate the redirect to the browser
    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    // generate the React markup for the current route
    if (renderProps) {
      // if the current route matched we have renderProps
      markup = renderToString(
        <RouterContext {...renderProps} />
      );
    } else {
      // otherwise we can render a 404 page
      markup = renderToString(
        <div>not found</div>
      );
      res.status(404);
    }

    // render the index template with the embedded React markup
    return res.render('index', { markup });
  });
});

/**
 * Start the server.
 */
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';

server.listen((err) => {
  if (err) {
    return console.error(err);
  }

  return console.info(`Server running on http://localhost:${port} [${env}]`);
});
