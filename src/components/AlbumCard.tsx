import React, { useMemo } from 'react';
import { Album } from '../lib/interfaces';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { favoriteAlbumsState } from '../recoil/albums';
import { useRecoilState } from 'recoil';

interface Props {
  album: Album;
}

const getCardStyles = (width: number) => {
  let styles: React.CSSProperties = {
    width: '100%',
    maxWidth: '18rem',
  };
  if (width >= 992) {
    styles = { width: 'calc(25% - 1rem)' };
  } else if (width >= 768) {
    styles = { width: 'calc(33% - 1rem)' };
  } else if (width >= 576) {
    styles = { width: 'calc(50% - 1rem)' };
  }
  return styles;
};

const AlbumCard: React.FC<Props> = ({ album }) => {
  const { width } = useWindowDimensions();
  const [favoriteAlbums, setFavoriteAlbums] =
    useRecoilState(favoriteAlbumsState);

  const onFavoriteAlbumClick = () => {
    setFavoriteAlbums((prevState) => [
      ...prevState,
      album.id.attributes['im:id'],
    ]);
  };

  const onRemoveFavoriteAlbum = () => {
    setFavoriteAlbums((prevState) =>
      prevState.filter((id) => id !== album.id.attributes['im:id'])
    );
  };

  const favorited = useMemo(
    () => favoriteAlbums.find((id) => id === album.id.attributes['im:id']),
    [favoriteAlbums]
  );

  return (
    <Card style={getCardStyles(width)}>
      <Card.Img
        variant="top"
        src={album['im:image'][2].label}
        alt={album['im:name'].label}
      />
      <Card.Body>
        <Card.Title>{album['im:name'].label}</Card.Title>
        <Card.Text>{album['im:artist'].label}</Card.Text>
        {!favorited ? (
          <Button onClick={onFavoriteAlbumClick} variant="primary">
            Add to favorite
          </Button>
        ) : (
          <Button onClick={onRemoveFavoriteAlbum} variant="danger">
            Remove from favorite
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default AlbumCard;
