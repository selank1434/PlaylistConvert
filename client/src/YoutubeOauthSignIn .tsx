/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
import { GoogleApis, google } from "googleapis";
import { useEffect } from "react";
import { cookies } from "./App";
import axios from "axios";
import { exec } from "child_process";
import { auth } from "googleapis/build/src/apis/youtube";
var youtube_client_id = '179187817902-rkbgko6mmccku8g4ck5jqi2g5fthva5d.apps.googleusercontent.com';
var redirect_uri = 'http://localhost:3001/callback'; // Your redirect uri

const YoutubeOauthSignIn = () => {
  // Google's OAuth 2.0 endpoint for requesting an access token
  const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
  // Parameters to pass to OAuth 2.0 endpoint.
  const params = {
    client_id: youtube_client_id,
    redirect_uri: redirect_uri,
    response_type: 'token',
    scope: 'https://www.googleapis.com/auth/youtube.readonly',
    include_granted_scopes: 'true',
    state: 'pass-through value',
  };

  const handleSubmit = () => {
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
  useEffect(() => {
  const currentUrl: string = window.location.href;

  // Create a URL object
  const urlObject: URL = new URL(currentUrl);

  // Get the access_token from the fragment identifier
  const hashParams: string[] = urlObject.hash.substr(1).split('&');
  const accessTokenParam: string | undefined = hashParams.find(param => param.startsWith('access_token='));

  // Check if access_token is found
  const accessToken: string | null = accessTokenParam ? accessTokenParam.split('=')[1] : null;

  // Print or use the access_token as needed
  cookies.set("access_token_yt",accessToken);
    // Access the extracted parameters

    //makes a backend call to the server 


  }, []);


  return (
    <div>
      <button onClick={handleSubmit}>Sign In with OAuth</button>
    </div>
  );
};



export default YoutubeOauthSignIn;


