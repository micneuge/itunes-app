import { fireEvent, render, screen } from '@testing-library/react';
import { RecoilRoot, snapshot_UNSTABLE } from 'recoil';
import { Suspense } from 'react';
import Albums from '../Albums';
import { flushPromisesAndTimers } from '../../lib/testUtils';
import SearchInput from '../SearchInput';

describe('Albums', () => {
  const mockState = [
    {
      id: {
        attributes: {
          'im:id': '1',
        },
      },
      'im:name': {
        label: 'Album name',
      },
    },
    {
      id: {
        attributes: {
          'im:id': '2',
        },
      },
      'im:name': {
        label: 'Album name 2',
      },
    },
  ];

  const mockResponse = {
    feed: {
      entry: mockState,
    },
  };

  const initialSnapshot = snapshot_UNSTABLE();
  const release = initialSnapshot.retain();

  test('display the albums info correctly', async () => {
    try {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        })
      ) as jest.Mock;

      render(
        <RecoilRoot>
          <Suspense fallback={<div>loading...</div>}>
            <Albums />
          </Suspense>
        </RecoilRoot>
      );
      await flushPromisesAndTimers();

      expect(
        screen.getByText(mockState[0]['im:name'].label)
      ).toBeInTheDocument();
      expect(screen.queryByText('loading...')).toBeNull();
    } finally {
      release();
    }
  });

  test('filter albums correctly', async () => {
    try {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        })
      ) as jest.Mock;

      render(
        <RecoilRoot>
          <Suspense fallback={<div>loading...</div>}>
            <Albums />
            <SearchInput />
          </Suspense>
        </RecoilRoot>
      );
      await flushPromisesAndTimers();

      const component = screen.getByTestId('name_input');

      fireEvent.change(component, { target: { value: 'Album name 2' } });
      expect(
        screen.getByText(mockState[1]['im:name'].label)
      ).toBeInTheDocument();
      expect(screen.queryByText('loading...')).toBeNull();

      fireEvent.change(component, { target: { value: '' } });
      expect(
        screen.getByText(mockState[0]['im:name'].label)
      ).toBeInTheDocument();
      expect(
        screen.getByText(mockState[1]['im:name'].label)
      ).toBeInTheDocument();

      fireEvent.change(component, { target: { value: 'Not found' } });
      expect(screen.queryByText(mockState[0]['im:name'].label)).toBeNull();
      expect(screen.queryByText(mockState[1]['im:name'].label)).toBeNull();
    } finally {
      release();
    }
  });
});
