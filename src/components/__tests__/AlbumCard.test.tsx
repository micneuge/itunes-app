import { fireEvent, render, screen } from '@testing-library/react';
import AlbumCard from '../AlbumCard';
import { Album } from '../../lib/interfaces';
import { RecoilRoot } from 'recoil';
import { RecoilObserver } from '../../lib/testUtils';
import { favoriteAlbumsState } from '../../recoil/albums';

describe('Album card', () => {
  const mockState = {
    id: {
      attributes: {
        'im:id': '1',
      },
    },
    'im:name': {
      label: 'Album name',
    },
    'im:artist': {
      label: 'Artist name',
    },
    'im:image': [{}, {}, { label: 'imageUrl' }],
  } as Album;

  test('display the album card info correctly', () => {
    render(
      <RecoilRoot>
        <AlbumCard album={mockState} />
      </RecoilRoot>
    );

    expect(screen.getByText(mockState['im:name'].label)).toBeInTheDocument();
    expect(screen.getByText(mockState['im:artist'].label)).toBeInTheDocument();
    const image = screen.getByAltText(mockState['im:name'].label);
    expect(image).toHaveAttribute('src', mockState['im:image'][2].label);
  });

  test('add the album to favorites', () => {
    const onChange = jest.fn();

    render(
      <RecoilRoot>
        <RecoilObserver node={favoriteAlbumsState} onChange={onChange} />
        <AlbumCard album={mockState} />
      </RecoilRoot>
    );

    fireEvent.click(screen.getByText('Add to favorite'));

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith([]); // Initial state on render.
    expect(onChange).toHaveBeenCalledWith(['1']); // New value on change.
  });
});
