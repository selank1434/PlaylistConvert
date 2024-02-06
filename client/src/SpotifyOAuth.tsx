/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
import { useEffect } from "react";
import { cookies } from "./App";

import axios from "axios";






var redirect_uri = 'http://localhost:3001/callback';



const SpotifyOauthSignIn = () => {
  var scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
  const oauth2Endpoint = 'https://accounts.spotify.com/authorize?';
  const params = {
    response_type: 'code',
    client_id: '92967b0aa1a24fc4b977716b6c11bcc1',
    scope: scope,
    redirect_uri: redirect_uri,
  };
  // Parameters to pass to OAuth 2.0 endpoint.
  const handleSubmit = async () => {
    // Create a <form> element to submit parameters to OAuth 2.0 endpoint.
    const form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Add form parameters as hidden input values.
    for (const p in params) {
      if (params.hasOwnProperty(p)) {
        const input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', (params as any)[p]);
        form.appendChild(input);
      }
    }

    // Add form to the page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();


  };

  const fetchDataForDropdown = async () => {
    const response = await axios.get('http://localhost:3000/callback',  {
      headers: {
      'Content-Type': 'application/json',
      'Custom-Header': 'Custom-Value',
      'code': cookies.get("access_token")
    }
  })
  return response;
  };



  useEffect(() => {
    const checkRedirect = async () => {
      if (window.location.search.length !== 0) {


        const urlSearchParams = new URLSearchParams(window.location.search);
  

        const code = urlSearchParams.get('code');
        
        cookies.set("access_token",code);
        
      } else {
        setTimeout(checkRedirect, 100); 
      }
    };
    checkRedirect();
  }, []);
 


  return (
    <div>
      <button onClick={handleSubmit}>Sign In to Spotify</button>
    </div>
  );
};



export default SpotifyOauthSignIn;


