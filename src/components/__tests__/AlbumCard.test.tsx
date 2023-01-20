import { render, screen } from '@testing-library/react';
import AlbumCard from '../AlbumCard';
import { Album } from '../../lib/interfaces';

describe('Album card', () => {
  const mockState = {
    'im:name': {
      label: 'Album name',
    },
    'im:artist': {
      label: 'Artist name',
    },
    'im:image': [{}, {}, { label: 'imageUrl' }],
  } as Album;

  test('display the album card info correctly', () => {
    render(<AlbumCard album={mockState} />);

    expect(screen.getByText(mockState['im:name'].label)).toBeInTheDocument();
    expect(screen.getByText(mockState['im:artist'].label)).toBeInTheDocument();
    const image = screen.getByAltText(mockState['im:name'].label);
    expect(image).toHaveAttribute('src', mockState['im:image'][2].label);
  });
});
