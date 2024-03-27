import axios from "axios";
import { PlaylistItem, PlaylistItemListResponse } from "./types";
import { cookies } from "./App";
interface ConversionProps {
    playlistItems: PlaylistItemListResponse| undefined;
    setPlaylistsYT: React.Dispatch<React.SetStateAction<PlaylistItemListResponse | undefined>>;
    setSearchedSpotifyTracks: React.Dispatch<React.SetStateAction<string[]>>;
    selectedPlaylistYT: PlaylistItem | undefined;
  }

const extractSongTitle= async (title: string) => {
    const hyphenIndex = title.indexOf('-');
    if (hyphenIndex !== -1) {

        let songTitle = title.substring(hyphenIndex + 1).trim();


        songTitle = songTitle.replace(/\([^)]*\).*/g, '');


        songTitle = songTitle.trim();

        return songTitle;
    } else {
        return title.trim();
    }
}
//I calll this to set my playlist based on what I select 
const createPlaylist= async (playlistName: string) : Promise<string> => {
  const bearer_cookie = cookies.get("access_token");
  const resp = await axios.get("http://localhost:3000/createSpotifyPlaylist", {
      headers: {
          Authorization: bearer_cookie, // Assuming bearer_cookie is the token
        },  
        params: {
            playlistName: playlistName
            // Add more parameters if needed
        },
  })

  return resp.data.id;
}   

const appendToPlaylist = async(playlistURIs: string [], playlistId: string) => {

    const bearer_cookie = cookies.get("access_token");
    const apiUrl = "http://localhost:3000/appendToPlaylistSpotify";
    const resp = await axios.post(apiUrl, { data: playlistURIs }, {
      headers: {
        'Content-Type': 'application/json',
          Authorization: bearer_cookie,
      },
      params:{
        playlistID: playlistId
      }
    });
    return resp.data;

}



const convertMan = async ({playlistItems,setPlaylistsYT, setSearchedSpotifyTracks,selectedPlaylistYT}: ConversionProps) => {
    const songUris: string[] = [];
    if (playlistItems === undefined){
      return;
    }
    await Promise.all(
    playlistItems.items.map(async (item) => {
        const songTitle = item.snippet.title;
        //Ok I am going to search for shit 
        const bearer_cookie = cookies.get("access_token");
         // Replace with the desired track name
        const trackName = await extractSongTitle(songTitle);
        const params = {
            trackName: trackName,
            type: 'track'
        };
          const apiUrl = 'http://localhost:3000/convert';
          await axios.get(apiUrl, {
            params: params,
            headers: {
              'Authorization': bearer_cookie
            }
          })
            .then(response => {
              console.log(response.data[0]);
              songUris.push(response.data[0].uri);
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error('Error status:', error.response.status);
                    console.error('Error data:', error.response.data);
                  } else if (error.request) {
                    // The request was made but no response was received
                    console.error('No response received');
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error message:', error.message);
                  }
                  console.error('Error config:', error.config);
            });

    
    })
    );

    //I need a state variable here sp o set spotify tracks 
    setSearchedSpotifyTracks(songUris);
    if (selectedPlaylistYT === undefined){
      return;
    }
  
    const x = await createPlaylist(selectedPlaylistYT.snippet.title);
    const y = await appendToPlaylist(songUris,x);
    //let us see if this work

}  
  const ConvertYTPlaylist : React.FC<ConversionProps> = ({playlistItems,setPlaylistsYT,setSearchedSpotifyTracks,selectedPlaylistYT}) => {
    
    if (playlistItems === undefined){
        return (<div></div>);
    }

    return (
      <div className="container mt-4">
        <button onClick={() => convertMan({playlistItems,setPlaylistsYT,setSearchedSpotifyTracks,selectedPlaylistYT})}>Convert {selectedPlaylistYT?.snippet.title}</button>
      </div>
    );
  };
  
  export default ConvertYTPlaylist;