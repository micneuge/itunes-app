import { atom, selector } from 'recoil';
import { fetchAlbums } from '../lib/api';
import { Album } from '../lib/interfaces';
import { inputState } from './searchInput';

const albumsState = selector<Album[]>({
  key: 'Albums',
  get: async () => {
    const response = await fetchAlbums();
    return response.feed.entry;
  },
});

export const filteredAlbums = selector<Album[]>({
  key: 'FilteredAlbums',
  get: ({ get }) => {
    const albums = get(albumsState);
    const input = get(inputState);
    return input === ''
      ? albums
      : albums.filter((album: Album) =>
          album['im:name'].label.toLowerCase().includes(input.toLowerCase())
        );
  },
});

export const favoriteAlbumsState = atom<string[]>({
  key: 'FavoriteAlbums',
  default: [],
});
