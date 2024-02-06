//This is going to take the request and make a 
import axios from "axios";
import { PlaylistItem, PlaylistItemListResponse, SpotifyPlaylist } from "./types";
import { cookies } from './App';


//I just need a data id 
//I want to set the 
const submit  = async (playlist: PlaylistItem| undefined, setSelectedPlaylistItems: React.Dispatch<React.SetStateAction<PlaylistItem| undefined>>, setPlaylistItemListResponse: React.Dispatch<React.SetStateAction<PlaylistItemListResponse | undefined>>) => {
  //make an axios request
   //Now I am going to set up something to callback 
   // Assuming the URL is stored in a variable called url
   // Get the current URL
   if(playlist === undefined){
    return;
   }
  const url = window.location.href;
// Create a URLSearchParams object to parse the URL
  const params = new URLSearchParams(url.split('#')[1]);
  // Extracting the access_token
  const accessToken = params.get('access_token');
  await axios.get('http://localhost:3000/displayYT', {
    headers: {
      Authorization: accessToken, // Assuming bearer_cookie is the token, // Assuming bearer_cookie is the token
    },  
    params: {
        id: playlist.id,
    }
})
.then(response => { 
    setPlaylistItemListResponse(response.data);
})
.catch(error => {
  console.error('Error submitting data:', error);
});
  
}
interface SubmitPlaylistProps{
  selectedPlaylist: PlaylistItem | undefined;
  setSelectedPlaylist:  React.Dispatch<React.SetStateAction<PlaylistItem | undefined>>;
  setPlaylistItemListResponse: React.Dispatch<React.SetStateAction<PlaylistItemListResponse | undefined>>;
}

const YTSubmitPlaylist : React.FC<SubmitPlaylistProps> = ({selectedPlaylist, setSelectedPlaylist,setPlaylistItemListResponse}) => {
    return (
      <button onClick={() => submit(selectedPlaylist,setSelectedPlaylist,setPlaylistItemListResponse)}>
        Submit Youtube Playlist
      </button>
    );
  };
  export default YTSubmitPlaylist;
