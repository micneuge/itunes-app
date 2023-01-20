import { fireEvent, render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import SearchInput from '../SearchInput';
import { RecoilObserver } from '../../lib/testUtils';
import { inputState } from '../../recoil/searchInput';

describe('The input state should', () => {
  test('change when the user enters a name.', () => {
    const onChange = jest.fn();
    render(
      <RecoilRoot>
        <RecoilObserver node={inputState} onChange={onChange} />
        <SearchInput />
      </RecoilRoot>
    );

    const component = screen.getByTestId('name_input');

    fireEvent.change(component, { target: { value: 'Recoil' } });

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith(''); // Initial state on render.
    expect(onChange).toHaveBeenCalledWith('Recoil'); // New value on change.
  });
});
