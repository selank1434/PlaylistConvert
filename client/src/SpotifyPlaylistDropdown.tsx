import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { cookies } from './App';
import { useEffect, useState } from 'react';
import { SpotifyPlaylist } from './types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { off } from 'process';
import { AsyncPaginate } from 'react-select-async-paginate';
import { response } from 'express';
//we need the cookie here somehow 


const fetchData = async (
  offset: number, 
  playlists: SpotifyPlaylist[],
  setPlaylists: React.Dispatch<React.SetStateAction<SpotifyPlaylist[]>>,
  setOffset: React.Dispatch<React.SetStateAction<number>>) : Promise<void|SpotifyPlaylist[]> => {
  try {
    const bearer_cookie = cookies.get("access_token");
    if(bearer_cookie === undefined){
        return [];
    }
    await axios.get('http://localhost:3000/playlists', {
        headers: {
          Authorization: `Bearer ${bearer_cookie}`, // Assuming bearer_cookie is the token
        },  
        params: {
            limit: 5,
            offset: offset
            // Add more parameters if needed
        },
    })
    .then(response => { 
      const concatenatedArrayConcat = playlists.concat(response.data.items);
      setPlaylists(concatenatedArrayConcat);
      setOffset(offset+5);
    })
    .catch(error => {
      console.error('Error submitting data:', error);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
interface PlaylistSelectorProps {
  selectedPlaylist: SpotifyPlaylist | undefined;
  setSelectedPlaylist: React.Dispatch<React.SetStateAction<SpotifyPlaylist | undefined>>;
}


//this state should be set
export const SpotifyPlaylistSelector: React.FC<PlaylistSelectorProps> = ({ selectedPlaylist, setSelectedPlaylist })  => {
    //I can store the session
    const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
    const [offset, setOffset] = useState(0);
    useEffect(() => {
        const authToken = cookies.get('access_token');
        if (authToken) {
          fetchData(offset,playlists,setPlaylists,setOffset);
        }
    });     
    const authToken = cookies.get('access_token');
    //now what I need to do is have the event to be is
    const handlePlaylistChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        const selectedPlaylist = playlists.find((playlist) => playlist.id === selectedId);
        setOffset(offset+5);
        fetchData(offset,playlists,setPlaylists,setOffset);
        setSelectedPlaylist(selectedPlaylist);
      };
    const playlistNames = playlists.map(playlist => playlist.name);
    console.log(playlistNames);
    return (
      
      <div>
        {authToken ? (
          // Authenticated content I want state in this ocmpoemt thourgh
          
          <div>
          <h2>Playlists</h2>
          <ul>
           
            <select value={selectedPlaylist?.id} onChange={handlePlaylistChange}>
            {playlists.map((playlist) => (
                  <option value={playlist.id}>{playlist.name}</option>
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