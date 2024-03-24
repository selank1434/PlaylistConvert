import axios from 'axios';
import { useEffect, useState } from 'react';
import { cookies } from './App';
import { SpotifyPlaylist } from './types';

const fetchData = async (
  accessToken: string,
  offset: number, 
  setPlaylists: React.Dispatch<React.SetStateAction<SpotifyPlaylist[]>>,
  setOffset: React.Dispatch<React.SetStateAction<number>>
): Promise<void> => {
  try {
    if (!accessToken) {
      console.log("Access token is undefined");
      return;
    }

    const response = await axios.get('http://localhost:3000/playlists', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },  
      params: {
        limit: 5,
        offset: offset
      },
    });

    const { data } = response;

    setPlaylists(prevPlaylists => [...prevPlaylists, ...data.items]);
    // setOffset(prevOffset => prevOffset + 5);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

interface PlaylistSelectorProps {
  selectedPlaylist: SpotifyPlaylist | undefined;
  setSelectedPlaylist: React.Dispatch<React.SetStateAction<SpotifyPlaylist | undefined>>;
  accessToken: string;
}

export const SpotifyPlaylistSelector: React.FC<PlaylistSelectorProps> = ({ selectedPlaylist, setSelectedPlaylist, accessToken })  => {
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const authToken = cookies.get('access_token');
    if (authToken && accessToken) {
      fetchData(accessToken, offset, setPlaylists, setOffset);
    }
  }, [accessToken, offset]);

  const handlePlaylistChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selectedPlaylist = playlists.find((playlist) => playlist.id === selectedId);
    setSelectedPlaylist(selectedPlaylist);
  };

  return (
    <div>
      {accessToken ? (
        <div>
          <h2>Playlists</h2>
          <ul>
            <select value={selectedPlaylist?.id} onChange={handlePlaylistChange}>
              {playlists.map((playlist) => (
                <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
              ))}
            </select>
          </ul>
        </div>
      ) : (
        <p>Please log in to access this content.</p>
      )}
    </div>
  );
};

export default SpotifyPlaylistSelector;
