import path from 'node:path';
import { readFileSync } from 'node:fs';

import React from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import express from 'express';
import { globSync } from 'glob';
import { collect } from 'linaria/server';

import App from '../common/components/app';
import rootReducer from '../common/store/reducer';
import { increaseCount } from '../common/store/actions/count';

const app = express();
const ROOT = path.resolve(__dirname, '../../');

let LINARIA_CSS = '';
const getLinariaCSS = () => {
  if (!LINARIA_CSS) {
    globSync('**/*.css', { cwd: path.join(ROOT, '.linaria-cache'), absolute: true }).forEach(file => {
      LINARIA_CSS += readFileSync(file, 'utf8');
    });
  }
  return LINARIA_CSS;
}

app.get('/favicon.ico', (req, res) => res.status(404).end());
app.use('/public', express.static(path.resolve('./dist/webpack')));
app.use('/styles', express.static(path.resolve('./dist/styles')));

app.get('*', (req, res) => {
  // Create store, pass initial state (eg: locale, i18n, route)
  const store = createStore(rootReducer, { count: 0, mounted: false });

  // Optionally dispatch actions to modify state
  store.dispatch(increaseCount());

  // Capture router context
  const routerContext = {};

  // Render app to string
  const markup = ReactDOM.renderToString(
    <StaticRouter location={ req.url } context={routerContext}>
      <Provider store={ store }>
        <App/>
      </Provider>
    </StaticRouter>
  );

  // Extract critical CSS
  const { critical } = collect(markup, getLinariaCSS());

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
    <doctype html>
    <html>
    <head>
      <title>Quick SSR Demo</title>
      <link rel="stylesheet" href="/styles/index.css"/>
      <style type="text/css">${ critical }</style>
    </head>
    <body>
      <div id="editor">${ markup }</div>
      <script> 
        window.__STATE__ = ${ JSON.stringify(state) };
      </script>
      <script src="/public/app.js"></script>
    </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('Example app listening on http://localhost:3000');
});
