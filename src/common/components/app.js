import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Suspense from './suspense';
import { mountApp } from '../store/actions/app';

const Client = React.lazy(() => import('../../client/components/app'));

export default function () {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    // Should only run once on client
    dispatch(mountApp());
  }, []);
  return (
    <>
      <h1>Quick SSR Demo</h1>
      <br/>
      <div>Count: { state.count }</div>
      <br/>
      <div>Mounted: { String(state.mounted) }</div>
      <br/>
      <Suspense fallback={ <div>Loading...</div> }>
        <Client/>
      </Suspense>
    </>
  );
}
