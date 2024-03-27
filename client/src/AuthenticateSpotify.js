import React from 'react';
import axios, { Axios } from 'axios';
import { cookies } from './App';


const fetchData = async (
  accessToken) => {
  try {
    //ok we have a state variable now let us use that 
    console.log("called fetch data");
    if(accessToken === ""){
        console.log("we think bearer is undefined");
        return [];
    }
    await axios.get('http://localhost:3000/playlists', {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Assuming bearer_cookie is the token
        },  
        params: {
            limit: 5,
            offset: 0
            // Add more parameters if needed
        },
    })
    .then(response => { 
      console.log("Have a response");
      console.log(response.data.items);
     
    })
    .catch(error => {
      console.log("bro");
      console.error('Error submitting data:', error);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};




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
  //within authenticate 
  //
  console.log("call back access token: ",response.data.access_token);
  cookies.set("access_token",response.data.access_token);
  setAccessToken(response.data.access_token);
  //after this 
  

  console.log("THis is my access token!!!!, "+ response.data);
  //ok now let me try fetch data here 
  
  //bro wtf is goinh on here 
  }
  return (
    <button onClick={login}>
      Authenticate
    </button>
  );
};





