import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router';

import Suspense from './suspense';
import { mountApp } from '../store/actions/app';
import { decreaseCount, increaseCount } from '../store/actions/count';
import Home from './routes/home';
import Foo from './routes/foo';
import Bar from './routes/bar';
import NotFound from './routes/404';
import { Link } from 'react-router-dom';

const Client = React.lazy(() => (
  import(/* webpackChunkName: "client" */ '../../client/components/app')
));

export default function () {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    // Should only run once on client
    dispatch(mountApp());
  }, []);
  return (
    <>
      <h1 className='title'>Quick SSR Demo</h1>
      <div>Mounted: { String(state.mounted) }</div>
      <div>Location: { location.pathname }</div>
      <div>
        Count: { state.count }
        <div>
          <button onClick={ () => dispatch(increaseCount()) }>+</button>
          <button onClick={ () => dispatch(decreaseCount()) }>-</button>
        </div>
      </div>
      <br/>
      <div>
        <h3>Common Foo Component</h3>
        <Suspense fallback={ <div>Loading...</div> }>
          <Client/>
        </Suspense>
      </div>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/foo">Foo</Link></li>
          <li><Link to="/bar">Bar</Link></li>
          <li><Link to="/baz">Oops</Link></li>
        </ul>
      </div>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/foo">
          <Foo/>
        </Route>
        <Route path="/bar">
          <Bar/>
        </Route>
        <Route component={ NotFound }/>
      </Switch>
    </>
  );
}
