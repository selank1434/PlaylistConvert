import React from 'react';
import axios, { Axios } from 'axios';
import { cookies } from './App';
import { fetchData } from './SpotifyPlaylistDropdown';


//I want the call back no 
export const AuthenticateSpotify = ({setPlaylists}) => {
  const login= async () => {
    alert("called fetch data");
    fetchData(setPlaylists)
  }
  return (
    <button onClick={login}>
      Authenticate
    </button>
  );
};



