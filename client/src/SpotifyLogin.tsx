

import { useEffect, useState } from "react";
import { cookies } from "./App";
import axios from "axios";


interface Props {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const SpotifyOauthSignIn: React.FC<Props> = ({loggedIn,setLoggedIn}) => {
  const login = () => {
    if(loggedIn === false){
      alert("rediecting");
      window.location.href = 'http://localhost:3000/login';
      setLoggedIn(true);
    }
  };

  return (
    <div>
      <button onClick={login}>Sign In to Spotify</button>
    </div>
  );
};

export default SpotifyOauthSignIn;
