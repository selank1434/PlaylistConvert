import axios from 'axios';
import { useEffect, useState } from 'react';
import { cookies } from './App';
import { SpotifyPlaylist } from './types';

export const fetchData = async (
  setPlaylists: React.Dispatch<React.SetStateAction<SpotifyPlaylist[]>>,
  limit: number = 5,
  offset: number = 0
): Promise<void> => {
  alert("Inside fetch pookie");
  try {
    // Make the request to fetch Spotify playlists
    const response = await axios.get('http://localhost:3000/getSpotifyPlaylists', {
      params: {
        limit,
        offset
      }
    });

    // Extract playlists from response data
    const { data } = response;
    console.log(data);
    const newPlaylists: SpotifyPlaylist[] = data.items;

    // Update playlists state
    setPlaylists(newPlaylists);
  } catch (error) {
    // Handle errors more gracefully
    console.error('Error fetching data:', error);
    // You might want to display an error message to the user
  }
};

interface PlaylistSelectorProps {
  selectedPlaylist: SpotifyPlaylist | undefined;
  setSelectedPlaylist: React.Dispatch<React.SetStateAction<SpotifyPlaylist | undefined>>;
  loggedIn: boolean;
}

export const SpotifyPlaylistSelector: React.FC<PlaylistSelectorProps> = ({ selectedPlaylist, setSelectedPlaylist,loggedIn })  => {
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if(loggedIn){
    fetchData(setPlaylists);
    console.log(selectedPlaylist);
    }
    
  }, [loggedIn]);

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
