import axios from "axios";
import { SpotifyPlaylist } from "./types";
import { cookies } from './App';



const submit  = async (playlist: SpotifyPlaylist| undefined) => {
  //make an axios request
  const bearer_cookie = cookies.get("access_token");
  if (playlist === undefined){
    return;
  }
  await axios.get('http://localhost:3000/playlist', {
    headers: {
      Authorization: `${bearer_cookie}`, // Assuming bearer_cookie is the token
    },  
    params: {
        id: playlist.href,
    }
})
.then(response => { 
})
.catch(error => {
  console.error('Error submitting data:', error);
});
  
}
interface SubmitPlaylistProps{
  selectedPlaylist: SpotifyPlaylist | undefined;
}

const SpotifySubmitPlaylist : React.FC<SubmitPlaylistProps> = ({selectedPlaylist}) => {
    return (
      <button onClick={() => submit(selectedPlaylist)}>
        Submit Spotify Playlist
      </button>
    );
  };
  export default SpotifySubmitPlaylist;
