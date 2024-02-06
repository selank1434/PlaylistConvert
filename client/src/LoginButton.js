import React from 'react';
import axios, { Axios } from 'axios';
import { cookies } from './App';
const MyButton = () => {

  return (
    <button onClick={login}>
      Authenticate
    </button>
  );
};

const login= async () => {
  if(window.location.search.length == 0){
    alert("Need to login first");
  }
  //Now I am going to set up something to callback 
const urlSearchParams = new URLSearchParams(window.location.search);

// Extract specific query parameters
const code = urlSearchParams.get('code');
const state = urlSearchParams.get('state');
console.log(code);
const response = await axios.get('http://localhost:3000/callback',  {
  headers: {
    'Content-Type': 'application/json',
    'Custom-Header': 'Custom-Value',
    'code': code,
    'state': state
  }
})


cookies.set("access_token",response.data.access_token);

//bro wtf is goinh on here 
}


export default MyButton;
