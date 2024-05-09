import { useSelector } from 'react-redux';

export default ({ fallback, children }) => {
  const mounted = useSelector(state => state.mounted);
  return mounted ? children : fallback;
}
