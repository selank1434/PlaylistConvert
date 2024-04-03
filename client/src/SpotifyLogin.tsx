

import { useEffect, useState } from "react";
import { cookies } from "./App";
import axios from "axios";

const redirect_uri = 'http://localhost:3001/callback';
const client_id = '92967b0aa1a24fc4b977716b6c11bcc1'
const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';



const SpotifyOauthSignIn: React.FC<{
  spotifyCallBack: string;
  setSpotifyCallback: React.Dispatch<React.SetStateAction<string>>;
}> = ({ spotifyCallBack, setSpotifyCallback })=> {
  //This function basically just send us to the spotify authorization link to get info 
  const handleSignIn = () => {
    window.location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
  };
  

  return (
    <div>
        <button onClick={handleSignIn}>Sign In to Spotify</button>

    </div>
  );
};

export default SpotifyOauthSignIn;
