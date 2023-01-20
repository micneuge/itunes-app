import { act } from '@testing-library/react';
import { useEffect } from 'react';
import { RecoilState, useRecoilValue } from 'recoil';

interface IRecoilObserver<T> {
  onChange: jest.Mock;
  node: RecoilState<T>;
}

export function RecoilObserver<T>({ node, onChange }: IRecoilObserver<T>) {
  const value = useRecoilValue(node);
  useEffect(() => onChange(value), [onChange, value]);
  return null;
}

// act and advance jest timers
export function flushPromisesAndTimers() {
  return act(
    () =>
      new Promise((resolve) => {
        setTimeout(resolve, 100);
        jest.runAllTimers();
      })
  );
}
