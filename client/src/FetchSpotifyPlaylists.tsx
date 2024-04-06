import axios from "axios";
import { SpotifyPlaylist } from "./types";

export const fetchSpotifyPlaylists = async (
    setSpotifyPlaylists: React.Dispatch<React.SetStateAction<SpotifyPlaylist[] | undefined>>,
    limit: number = 5,
    offset: number = 0
  ): Promise<void> => {
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
  
  
      // Update playlists state
      setSpotifyPlaylists(data);
  
      return data;
          
    } catch (error) {
      // Handle errors more gracefully
      console.error('Error fetching data:', error);
      // You might want to display an error message to the user
    }
  };
  