import React from 'react';
import Suspense from '../suspense';
import {styled} from "linaria/react";

const Container = styled.div`
  background-color: cyan;
`;

const ClientFoo = React.lazy(() => (
  import(/* webpackChunkName: "foo" */ '../../../client/components/foo')
));

export default function () {
  return (
    <Container>
      <h3>Common Foo Component</h3>
      <Suspense fallback={<div>Loading...</div>}>
        <ClientFoo />
      </Suspense>
    </Container>
  )
}
