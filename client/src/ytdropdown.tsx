import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { cookies } from './App';
import { useEffect, useState } from 'react';
import { PlaylistItem, PlaylistListResponse, SpotifyPlaylist } from './types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { off } from 'process';
import { AsyncPaginate } from 'react-select-async-paginate';
import { response } from 'express';
//we need the cookie here somehow 



const fetchData = async (setPlaylists: React.Dispatch<React.SetStateAction<PlaylistItem[]>>, setSelectedPlaylists: React.Dispatch<React.SetStateAction<PlaylistItem|undefined>>): Promise<void|PlaylistItem[]> => {
    //I should have this info on the server 
    const bearer_cookie = cookies.get("access_token_yt");
    
    await axios.get('http://localhost:3000/play', {
        headers: {
          Authorization: bearer_cookie, // Assuming bearer_cookie is the token, // Assuming bearer_cookie is the token
        }
      })
    .then(response => { 
       setPlaylists(response.data.items);
       setSelectedPlaylists(response.data.items[0]);
    })
    .catch(error => {
      console.error('Error submitting data:', error);
    });

};
interface YTPlaylistSelectorProps {
  selectedPlaylist: PlaylistItem | undefined;
  setSelectedPlaylist: React.Dispatch<React.SetStateAction<PlaylistItem | undefined>>;
  playlists: PlaylistItem[] | undefined;
  setPlaylists:  React.Dispatch<React.SetStateAction<PlaylistItem[]>>;
}


//this state should be set
export const YTDropDown: React.FC<YTPlaylistSelectorProps> = ({ selectedPlaylist, setSelectedPlaylist, playlists, setPlaylists })  => {

    const [offset, setOffset] = useState(0);
    useEffect(() => {
        const authToken = cookies.get('access_token_yt');
        //no my check
        if (authToken) {
          fetchData(setPlaylists,setSelectedPlaylist);
        }
    }, []);     
    const authToken = cookies.get('access_token_yt');
    console.log(playlists);
    if(playlists === undefined){
      return (<div></div>);
    }

    const handlePlaylistChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        const selectedPlaylist = playlists.find((playlist) => playlist.id === selectedId);
        setSelectedPlaylist(selectedPlaylist);
      };
    return (
      
      <div>
        {authToken && playlists !== undefined? (

          
          <div>
          <h2>Playlists</h2>
          <ul>
           
            <select value={selectedPlaylist?.id} onChange={handlePlaylistChange}>
            {playlists.map((playlist) => (
                  <option value={playlist.id} key={playlist.id}>{playlist.snippet.title}</option>
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




export default YTDropDown;