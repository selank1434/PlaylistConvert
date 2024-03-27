// /*
//  * Create form to request access token from Google's OAuth 2.0 server.
//  */
// import { useEffect } from "react";
// import { cookies } from "./App";

// import axios from "axios";






// var redirect_uri = 'http://localhost:3001/callback';



// const SpotifyOauthSignIn = () => {
//   var scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
//   const oauth2Endpoint = 'https://accounts.spotify.com/authorize?';
//   const params = {
//     response_type: 'code',
//     client_id: '92967b0aa1a24fc4b977716b6c11bcc1',
//     scope: scope,
//     redirect_uri: redirect_uri,
//   };

//   const handleSubmit = async () => {

//     const form = document.createElement('form');
//     form.setAttribute('method', 'GET');
//     form.setAttribute('action', oauth2Endpoint);

//     // Add form parameters as hidden input values.
//     for (const p in params) {
//       if (params.hasOwnProperty(p)) {
//         const input = document.createElement('input');
//         input.setAttribute('type', 'hidden');
//         input.setAttribute('name', p);
//         input.setAttribute('value', (params as any)[p]);
//         form.appendChild(input);
//       }
//     }

//     // Add form to the page and submit it to open the OAuth 2.0 endpoint.
//     document.body.appendChild(form);
//     form.submit();


//   };

//   const fetchDataForDropdown = async () => {
//     const response = await axios.get('http://localhost:3000/callback',  {
//       headers: {
//       'Content-Type': 'application/json',
//       'Custom-Header': 'Custom-Value',
//       'code': cookies.get("access_token")
//     }
//   })
//   return response;
//   };



//   useEffect(() => {
//     const checkRedirect = async () => {
//       if (window.location.search.length !== 0) {


//         const urlSearchParams = new URLSearchParams(window.location.search);
  

//         const code = urlSearchParams.get('code');
        
//         cookies.set("access_token",code);
        
//       } else {
//         setTimeout(checkRedirect, 100); 
//       }
//     };
//     checkRedirect();
//   }, []);
 


//   return (
//     <div>
//       <button onClick={handleSubmit}>Sign In to Spotify</button>
//     </div>
//   );
// };



// export default SpotifyOauthSignIn;


import { useEffect, useState } from "react";
import { cookies } from "./App";
import axios from "axios";

const redirect_uri = 'http://localhost:3001/callback';
const client_id = '92967b0aa1a24fc4b977716b6c11bcc1'
const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';


//I am going to set a state variable called
const SpotifyOauthSignIn: React.FC<{
  spotifyCallBack: string;
  setSpotifyCallback: React.Dispatch<React.SetStateAction<string>>;
}> = ({ spotifyCallBack, setSpotifyCallback })=> {


  useEffect(() => {
    const handleCallback = async () => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const code = urlSearchParams.get('code');
      if (code) {
        //This is not an access_token it is a callabckl
        cookies.set("call_back", code);
        setSpotifyCallback(code);
        //at this point we have the call back 
      }
    };

    handleCallback();
  }, []);

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
