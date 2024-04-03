import React from 'react';
import axios, { Axios } from 'axios';
import { cookies } from './App';


//I want the call back no 
export const AuthenticateSpotify = ({setAccessToken, accessToken}) => {
  const login= async () => {
    if(window.location.search.length === 0 && accessToken === ""){
      alert("Need to login first");
    }
    //Now I am going to set up something to callback 
    //if access token is already defined leave it alone 

  const urlSearchParams = new URLSearchParams(window.location.search);
  
  // Extract specific query parameters
  const code = urlSearchParams.get('code');
  const state = urlSearchParams.get('state');
  console.log(code);
  
  const response = await axios.get('http://localhost:3000/callback', {
    headers: {
      'Content-Type': 'application/json',
      'Custom-Header': 'Custom-Value',
    },
    params: {
      code: code,
      state: state
    }
  });
  console.log(response.data.access_token);
  setAccessToken(response.data.access_token);
  //after this 

  //ok now let me try fetch data here 
  
  //bro wtf is goinh on here 
  }
  return (
    <button onClick={login}>
      Authenticate
    </button>
  );
};




