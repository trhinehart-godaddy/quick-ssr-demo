import { DECREMENT, INCREMENT } from './types';

export const increaseCount = () => ({ type: INCREMENT });
export const decreaseCount = () => ({ type: DECREMENT });
