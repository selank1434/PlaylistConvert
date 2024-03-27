import { useState } from 'react';
import Cookies from 'universal-cookie';
import './App.css';
import { AuthenticateSpotify } from './AuthenticateSpotify';
import SpotifyPlaylistSelector from './SpotifyPlaylistDropdown';
import { useCookies } from 'react-cookie';
import { PlaylistItem, PlaylistItemListResponse, SpotifyPlaylist } from './types';
import SpotifySubmitPlaylist from './SpotifySubmitPlaylist';
import YoutubeOauthSignIn from './YoutubeOauthSignIn ';
import YTDropDown from './ytdropdown';
import YTSubmitPlaylist from './SubmitYoutube';
import InfoDisplay from './YTPlaylistDisplay';
import ConvertYTplaylist from './ConvertYTPlaylist';
import SpotifyOauthSignIn from './SpotifyLogin';


export const cookies = new Cookies();

function App() {

  const [selectedPlaylist, setSelectedPlaylist] = useState<SpotifyPlaylist| undefined>(undefined);
  const [selectedPlaylistYT, setSelectedPlaylistYT] = useState<PlaylistItem| undefined>(undefined);
  const [playlistsYT, setPlaylistsYT] = useState<PlaylistItem[]>([]);
  const [selectedPlaylistTracks,setSelectedPlaylistTracks] = useState<PlaylistItemListResponse| undefined>(undefined);
  const [searchedSpotifyTracks,setSearchedSpotifyTracks] = useState<string[]>([]);
  const [spotifyCallBack, setSpotifyCallback] = useState("");
  //ok this is the access_token for the spotify api 
  console.log();
  const [access_token, setAccessToken] = useState("");
  const [modalOpen, setModalOpen] = useState(true);
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <SpotifyOauthSignIn spotifyCallBack={spotifyCallBack} setSpotifyCallback={setSpotifyCallback} />
        <AuthenticateSpotify setAccessToken={setAccessToken} accessToken={access_token}/>
        <SpotifyPlaylistSelector
          selectedPlaylist={selectedPlaylist}
          setSelectedPlaylist={setSelectedPlaylist}
          accessToken={access_token}
        />
        <YoutubeOauthSignIn/>
        <YTDropDown
          selectedPlaylist={selectedPlaylistYT}
          setSelectedPlaylist={setSelectedPlaylistYT}
          playlists={playlistsYT}
          setPlaylists={setPlaylistsYT}
        />
        <YTSubmitPlaylist selectedPlaylist={selectedPlaylistYT} setSelectedPlaylist={setSelectedPlaylistYT} setPlaylistItemListResponse={setSelectedPlaylistTracks}/>
        <InfoDisplay playlistItems={selectedPlaylistTracks} setPlaylistsYT={setSelectedPlaylistTracks}/>
        <ConvertYTplaylist
          playlistItems={selectedPlaylistTracks} 
          setPlaylistsYT={setSelectedPlaylistTracks} 
          setSearchedSpotifyTracks={setSearchedSpotifyTracks} 
          selectedPlaylistYT={selectedPlaylistYT}
        />
      </header>
    </div>
  );
}

export default App;
