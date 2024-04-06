import { fetchSpotifyPlaylists } from "./FetchSpotifyPlaylists";
import { SpotifyPlaylist } from "./types";

/**
 * A React functional component for authenticating and fetching Spotify playlists.
 * This component provides a button to initiate the authentication process and fetch Spotify playlists.
 * 
 * @param {Object} props - The props object containing:
 *   @param {Function} setSpotifyPlaylists - A function to set the fetched Spotify playlists.
 * 
 * @returns {JSX.Element} A JSX element representing the Spotify authentication component.
 */

interface FetchSpotifyPlaylistsButtonProps {
  setSpotifyPlaylists: React.Dispatch<React.SetStateAction<SpotifyPlaylist[]| undefined>>;
}
export const FetchSpotifyPlaylistsButton: React.FC<FetchSpotifyPlaylistsButtonProps> = ({setSpotifyPlaylists}) => {
  const login= async () => {
    await fetchSpotifyPlaylists(setSpotifyPlaylists);
  }
  return (
    <button onClick={login}>
      Fetch Spotify Playlits
    </button>
  );
};



