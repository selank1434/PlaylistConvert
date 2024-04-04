import axios from 'axios';
import { useEffect, useState } from 'react';
import { cookies } from './App';
import { SpotifyPlaylist } from './types';

export const fetchData = async (
  accessToken: string | undefined,
  offset: number, 
  setPlaylists: React.Dispatch<React.SetStateAction<SpotifyPlaylist[]>>,
  setOffset: React.Dispatch<React.SetStateAction<number>>
): Promise<void> => {
  try {
    //ok here i expect a 
    if(accessToken === ""){
      return;
    }
    const response = await axios.get('http://localhost:3000/playlists', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },  
      params: {
        limit: 5,
        offset: 0
      },
    });
    if(response.status !== 200){
      alert("API FAIL");
    }

    const { data } = response;
    console.log("response ",response.data);
    setPlaylists(prevPlaylists => [...prevPlaylists, ...data.items]);
    // setOffset(prevOffset => prevOffset + 5);
  
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

interface PlaylistSelectorProps {
  selectedPlaylist: SpotifyPlaylist | undefined;
  setSelectedPlaylist: React.Dispatch<React.SetStateAction<SpotifyPlaylist | undefined>>;
  spotifyCookieSet: boolean;
}

export const SpotifyPlaylistSelector: React.FC<PlaylistSelectorProps> = ({ selectedPlaylist, setSelectedPlaylist,spotifyCookieSet })  => {
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchData(cookies.get("access_token"), 0, setPlaylists, setOffset);
  }, [spotifyCookieSet]);

  const handlePlaylistChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selectedPlaylist = playlists.find((playlist) => playlist.id === selectedId);
    setSelectedPlaylist(selectedPlaylist);
  };
  return (
    <div>
      {true ? (
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
