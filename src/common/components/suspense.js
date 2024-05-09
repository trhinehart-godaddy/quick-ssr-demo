import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';

export default ({ fallback, children }) => {
  const mounted = useSelector(state => state.mounted);
  return mounted ? (
    <Suspense fallback={ fallback }>
      { children }
    </Suspense>
  ) : fallback;
}
