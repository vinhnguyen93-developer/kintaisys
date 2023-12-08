'use client';

import { useSelector, useDispatch } from 'react-redux';

import {
  increment,
  decrement,
  incrementByAmount,
} from './GlobalRedux/reducers/counter.';

const Home = () => {
  const count = useSelector((state) => state.counter);

  const dispatch = useDispatch();

  console.log('count: ', count);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={() => dispatch(increment())}>Click increment</button>
      <h1>{count?.value}</h1>
      <button onClick={() => dispatch(decrement())}>Click decrement</button>
      <button onClick={() => dispatch(incrementByAmount(2))}>
        Click increment by 2
      </button>
    </main>
  );
};

export default Home;
