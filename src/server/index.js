import path from 'path';
import {readFileSync} from 'fs';

import React from 'react';
import ReactDOM from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import express from 'express';
import {collect} from 'linaria/server';

import App from '../common/components/app';
import rootReducer from '../common/store/reducer';
import {increaseCount} from '../common/store/actions/count';

const app = express();
const css = readFileSync(path.resolve(__dirname, '../../webpack/server/styles.css'), 'utf8');

app.get('/favicon.ico', (req, res) => res.status(404).end());
app.use('/public', express.static(path.resolve('./dist/webpack/client')));

app.get('*', (req, res) => {
  // Create store, pass initial state (eg: locale, i18n, route)
  const store = createStore(rootReducer, {count: 0, mounted: false});

  // Optionally dispatch actions to modify state
  store.dispatch(increaseCount());

  // Capture router context
  const routerContext = {};

  // Render app to string
  const markup = ReactDOM.renderToString(
    <StaticRouter location={req.url} context={routerContext}>
      <Provider store={store}>
        <App/>
      </Provider>
    </StaticRouter>
  );
  const {critical: criticalCss} = collect(markup, css);

  // Check router context for redirects
  if (routerContext.url) {
    // Somewhere a `<Redirect>` was rendered
    return void res.redirect(routerContext.status || 301, routerContext.url);
  }
  if (routerContext.status) {
    // Somewhere a `<Status>` was rendered
    res.status(routerContext.status);
  }

  // Capture final state
  const state = store.getState();

  // Return HTML and state
  res.send(`
    <!doctype html>
    <html lang="en">
    <head>
      <title>Quick SSR Demo</title>
      <style type="text/css">${criticalCss}</style>
    </head>
    <body>
      <div id="editor">${markup}</div>
      <script> 
        window.__STATE__ = ${JSON.stringify(state)};
      </script>
      <script src="/public/client.js"></script>
    </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('Example app listening on http://localhost:3000');
});
