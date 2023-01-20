import { useRecoilValue } from 'recoil';
import { filteredAlbums } from '../recoil/albums';
import { Album } from '../lib/interfaces';

const Albums = () => {
  const albums = useRecoilValue(filteredAlbums);

  return (
    <div>
      {albums.map((album: Album) => (
        <p key={album.id.attributes['im:id']}>{album['im:name'].label}</p>
      ))}
    </div>
  );
};

export default Albums;
