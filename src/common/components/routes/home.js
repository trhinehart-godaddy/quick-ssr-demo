import React from 'react';
import { css } from 'linaria';

const styles = {
  head: css`
    background-color: cyan;
  `
}

export default function () {
  return (
    <h3 className={ styles.head }>Home Page</h3>
  );
}
