import { useRecoilValue } from 'recoil';
import { filteredAlbums } from '../recoil/albums';
import { Album } from '../lib/interfaces';
import AlbumCard from './AlbumCard';

const Albums = () => {
  const albums = useRecoilValue(filteredAlbums);

  return (
    <div className="d-flex flex-wrap gap-3 justify-content-center">
      {albums.map((album: Album) => (
        <AlbumCard key={album.id.attributes['im:id']} album={album} />
      ))}
    </div>
  );
};

export default Albums;
