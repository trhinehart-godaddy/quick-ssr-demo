import React from 'react';
import Suspense from '../suspense';

const ClientBar = React.lazy(() => (
  import(/* webpackChunkName: "bar" */ '../../../client/components/bar')
));

export default function () {
  return (
    <div>
      <h3>Common Bar Component</h3>
      <Suspense fallback={<div>Loading...</div>}>
        <ClientBar />
      </Suspense>
    </div>
  )
}
