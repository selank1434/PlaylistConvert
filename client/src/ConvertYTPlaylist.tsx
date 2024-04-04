import axios from "axios";
import { PlaylistItem, PlaylistItemListResponse } from "./types";
import { cookies } from "./App";
import { response } from "express";
interface ConversionProps {
    playlistItems: PlaylistItemListResponse| undefined;
    setPlaylistsYT: React.Dispatch<React.SetStateAction<PlaylistItemListResponse | undefined>>;
    setSearchedSpotifyTracks: React.Dispatch<React.SetStateAction<string[]>>;
    selectedPlaylistYT: PlaylistItem | undefined;
  }
  // const bearer_cookie = cookies.get("access_token_yt");
/**
 * Extracts the song title from a given string containing the title and artist separated by a hyphen.
 * If no hyphen is found, returns the input string trimmed.
 * 
 * @param {string} title - The string containing the title and artist separated by a hyphen.
 * @returns {Promise<string>} - The extracted song title or the trimmed input string if no hyphen is found.
 */
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
/**
 * This method will create a spotify playlist that 
 * 
 * @param {string} playlistName - The string containing the title of my new playlist
 * @param {string} access_token - This is the spotify api token we have stored in state
 * @returns {Promise<string>} - The spotify playlist id of my new playlists
 */

const createPlaylist= async (playlistName: string, access_token: String) : Promise<string> => {
  const resp = await axios.get("http://localhost:3000/createSpotifyPlaylist", {
      headers: {
          Authorization: `${access_token}` // Assuming bearer_cookie is the token
        },  
        params: {
            playlistName: playlistName
            // Add more parameters if needed
        },
  })
  console.log(resp);
  return resp.data.id;
}   

const appendToPlaylist = async(playlistURIs: string [], playlistId: string, access_token: String) => {

    const bearer_cookie = `${access_token}`;
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
    const access_token = cookies.get("access_token");
    await Promise.all(
    playlistItems.items.map(async (item) => {
        const songTitle = item.snippet.title;
        //Ok I am going to search for shit 
        // const bearer_cookie = cookies.get("access_token");
        const bearer_cookie = `Bearer ${access_token}`;
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
              'Authorization': access_token
            }
          })
            .then(response => {
              if(response.data.length === 0){
                alert("track "+ songTitle + " not found");
              }
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
    console.log("Called convert man");
    const x = await createPlaylist(selectedPlaylistYT.snippet.title,access_token);
    const y = await appendToPlaylist(songUris,x,access_token);
    console.log(y);
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