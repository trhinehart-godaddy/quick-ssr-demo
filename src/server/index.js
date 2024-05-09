import path from 'node:path';

import React from 'react';
import ReactDOM from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import express from 'express';

import App from '../common/components/app';
import rootReducer from '../common/store/reducer';
import { increaseCount } from '../common/store/actions/count';

const app = express();

app.get('/favicon.ico', (req, res) => res.status(204).end());
app.use('/public', express.static(path.resolve('./dist/webpack')));

app.get('/', (req, res) => {
  // Create store, pass initial state (eg: locale, i18n, route)
  const store = createStore(rootReducer, { count: 0, mounted: false });

  // Optionally dispatch actions to modify state
  store.dispatch(increaseCount());

  // Render app to string
  const markup = ReactDOM.renderToString(
    <Provider store={ store }>
      <App/>
    </Provider>
  );

  // Capture final state
  const state = store.getState();

  // Return HTML and state
  res.send(`
    <doctype html>
    <html>
    <head>
      <title>Quick SSR Demo</title>
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
