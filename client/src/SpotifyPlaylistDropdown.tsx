import axios from 'axios';
import { useEffect, useState } from 'react';
import { cookies } from './App';
import { SpotifyPlaylist } from './types';
import { sasportal } from 'googleapis/build/src/apis/sasportal';


interface PlaylistSelectorProps {
  selectedPlaylist: SpotifyPlaylist | undefined;
  setSelectedPlaylist: React.Dispatch<React.SetStateAction<SpotifyPlaylist | undefined>>;
  spotifyPlaylists: SpotifyPlaylist[] | undefined;
  setSpotifyPlaylists: React.Dispatch<React.SetStateAction<SpotifyPlaylist[]| undefined>>;
}

export const SpotifyPlaylistSelector: React.FC<PlaylistSelectorProps> = ({ selectedPlaylist, setSelectedPlaylist,setSpotifyPlaylists, spotifyPlaylists})  => {


  const handlePlaylistChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if(spotifyPlaylists === undefined){
      return;
    }
    const selectedId = event.target.value;
    const selectedPlaylist = spotifyPlaylists.find((playlist) => playlist.id === selectedId);
    setSelectedPlaylist(selectedPlaylist);
  };
  return (
    <div>
      {spotifyPlaylists !== undefined? (
        <div>
          <h2>Playlists</h2>
          <ul>
            <select value={selectedPlaylist?.id} onChange={handlePlaylistChange}>
              {spotifyPlaylists.map((playlist) => (
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
