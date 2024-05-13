import { css } from 'linaria';
import React from 'react';

const styles = {
  container: css`
    background-color: #f0f0f0;
  `
}

export default () => {
  return (
    <div className={styles.container}>
      <div>Client Foo Component</div>
    </div>
  )
}
