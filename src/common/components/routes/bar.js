import React from 'react';
import Suspense from '../suspense';
import {css} from "linaria";

const styles = {
  container: css`
    background-color: green;
  `
};

const ClientBar = React.lazy(() => (import(/* webpackChunkName: "bar" */ '../../../client/components/bar')));

export default function () {
  return (
    <div className={styles.container}>
      <h3>Common Bar Component</h3>
      <Suspense fallback={<div>Loading...</div>}>
        <ClientBar/>
      </Suspense>
    </div>
  )
}
