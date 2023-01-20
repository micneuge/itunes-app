const BASE_URL = 'https://itunes.apple.com';

export const fetchAlbums = async () => {
  const response = await fetch(`${BASE_URL}/us/rss/topalbums/limit=100/json`);
  const albums = await response.json();
  return albums;
};
