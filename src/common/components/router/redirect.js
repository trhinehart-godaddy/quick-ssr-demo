import React from 'react';
import { Redirect, Route } from 'react-router';

export default function ({ from, to, status }) {
  return (
    <Route render={ ({ staticContext }) => {
      if (staticContext) {
        staticContext.status = status;
      }
      return <Redirect from={ from } to={ to }/>;
    } }/>
  );
}
