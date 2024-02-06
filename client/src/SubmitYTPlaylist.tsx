//first I am going to get the backend route to work 

import axios from "axios";
import { cookies } from "./App";

const SubmitYTPlaylist = () => {
    return(
    <button onClick={login}>
        Messing with Google
    </button>
    );
    //I want to create a pla
}

const login =  () => {
    if(window.location.hash.length === 0){
      alert("Need to login first");
    }

    //Now I am going to set up something to callback 
    const hashParams: { [key: string]: string } = {};
    window.location.hash
      .substring(1)
      .split('&')
      .forEach((param) => {
        const [key, value] = param.split('=');
        hashParams[key] = decodeURIComponent(value);
      });
      const baseUrl = window.location.href.split('?')[0];
  // Use replaceState to modify the URL without reloading the page
    window.history.replaceState(null, "", baseUrl);
    // Access the extracted parameters
    const code = hashParams.access_token;
    //what I want to do is store it in state locally how can i do that once I am
    axios.get('http://localhost:3000/play', {
        headers: {
          Authorization: code, // Assuming bearer_cookie is the token, // Assuming bearer_cookie is the token
        }
      })
    .then(response => { 
       //now with this response I have all my playlists with this I am going to do the following 
       //Find the playlist names and other bull shit 
    })
    .catch(error => {
      console.error('Error submitting data:', error);
    });
   
}
export default SubmitYTPlaylist;

