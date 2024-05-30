import React from 'react';
import Suspense from '../suspense';

const ClientFoo = React.lazy(() => (
  import(/* webpackChunkName: "foo" */ '../../../client/components/foo')
));

export default function () {
  return (
    <div>
      <h3>Common Foo Component</h3>
      <Suspense fallback={<div>Loading...</div>}>
        <ClientFoo />
      </Suspense>
    </div>
  )
}
