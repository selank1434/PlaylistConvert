/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/documentation/web-api/tutorials/code-flow
 */
const url = require('url');

const path = require('path');


require('dotenv').config({ path: path.join(__dirname, '../my.env') });





// Receive the callback from Google's OAuth 2.0 server.
var express = require('express');
var request = require('request');
var crypto = require('crypto');
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var axios = require('axios');


var redirect_uri = 'http://localhost:3001/callback'; // Your redirect uri

//get a specific playlist that I want to 
const {google} = require('googleapis');


const youtube_client_id = process.env.YOUTUBE_CLIENT_ID;
const youtube_secret = process.env.YOUTUBE_SECRET;
const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;

// ... rest of your code




const oauth2Client = new google.auth.OAuth2(
  youtube_client_id,
  youtube_secret,
  redirect_uri
);



/**
 * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI
 * from the client_secret.json file. To get these credentials for your application, visit
 * https://console.cloud.google.com/apis/credentials.
 */



const generateRandomString = (length) => {
  return crypto
  .randomBytes(60)
  .toString('hex')
  .slice(0, length);
}

var stateKey = 'spotify_auth_state';

var spotify_access_token = undefined;
var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());
app.use(express.json());
app.get('/login',  cors(), function(req, res) {
  
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Methods', 'GET'); // Adjust based on your requirements
  res.header('Access-Control-Allow-Headers', 'Content-Type'); // Adjust based on your requirements
  var scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: spotify_client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});



app.get('/loginYT',  cors(), function(req, res) {
  
  
  // Access scopes for read-only Drive activity.
  const scopes = [ 
    'https://www.googleapis.com/auth/youtube'
  ];
  // Generate a url that asks permissions for the Drive activity scope
   const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    /** Pass in the scopes array defined above.
      * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
    scope: scopes,
    // Enable incremental authorization. Recommended as a best practice.
    include_granted_scopes: true
    })
    // console.log("ur;",url)
    res.writeHead(301, { "Location": url });
    res.end();
});

app.get("/", function(req,res) {
  res.send("slime");
});


//this part is supposed to be where the magic happens 
//I have the code and now need to request an access token 



app.get('/callback', cors(), function(req, res) {
  console.log(req.query.code);
  // console.log(req.query.code);
  axios.post('https://accounts.spotify.com/api/token', `code=${req.query.code}&redirect_uri=${redirect_uri}&grant_type=authorization_code`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(`${spotify_client_id}:${spotify_client_secret}`).toString('base64')
    }
  }).then(response => {
    // Handle the successful response
    res.cookie('access_token', response.data.access_token, { sameSite: 'None', secure: true });
    res.cookie('refresh_token', response.data.refresh_token, { sameSite: 'None', secure: true });
    // console.log(response.data);

    // Send the response
    res.send(response.data);
  }).catch(error => {
    // Handle errors
    console.error('Error:', error.response.data);
    res.status(error.response.status).send(error.response.data);
  });
});

app.get('/refresh_token', function(req, res) {

  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')) 
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };
  console.log(authOptions);
  // request.post(authOptions, function(error, response, body) {
  //   if (!error && response.statusCode === 200) {
  //     var access_token = body.access_token,
  //         refresh_token = body.refresh_token;
  //     res.send({
  //       'access_token': access_token,
  //       'refresh_token': refresh_token
  //     });
  //   }
  // });
});

//this is for spotify playlists 
app.get('/playlists', function(req, res) {
  console.log("Headers: ",req.headers.authorization);
  const authorizationHeader = {'Authorization': `${req.headers.authorization}`};
  axios.get('https://api.spotify.com/v1/me/playlists', {
    headers: authorizationHeader,  
      params: {
        limit: req.query.limit,
        offset: req.query.offset
      }    
   }).then(response => {
       // Handle the response data here
       const bruh = []
       console.log(response);
       res.send(response.data);
   }).catch(error => {
  //     // Handle errors here
      console.log(error);
  });
});


app.get('/playlist', function(req, res) {

  const authorizationHeader = {'Authorization': `${req.headers.authorization}`};
  axios.get(req.query.id, {
    headers: authorizationHeader,  
   }).then(response => {
       // Handle the response data here
       const bruh = []
       res.send(response.data);
   }).catch(error => {
  //     // Handle errors here
  });

});


app.get('/play', function(req, res) {

  oauth2Client.setCredentials({
    access_token: req.headers.authorization
  });
  const youtube = google.youtube({
    version: 'v3',
    auth: oauth2Client,
  });
    const resp = youtube.playlists.list({
      part: 'snippet', 
      mine: true
    }, (err1, res1) => {
      if (err1) {
        console.error('Error in YouTube API request:', err1);
        res.status(500).send('Error in YouTube API request');
        return;
      }
      const playlists = res1.data;

      res.send(res1.data);
      //Now I want to get a list of the playlists 
    });
   
});
app.get("/displayYT", function(req, res) {
  // console.log("Header", req.headers.authorization);
  // console.log("QUERYID", req.query.id);
  // console.log("query if", req.query.id);
  oauth2Client.setCredentials({
    access_token: req.headers.authorization
  });
  const youtube = google.youtube({
    version: 'v3',
    auth: oauth2Client,
  });
  //this does not get all information though I should also display the 
  //I am here and I got all these titles 
  youtube.playlistItems.list({ 
  part: "snippet", 
  playlistId: req.query.id,
  maxResults: 50 
  }, (err, resp) => {
    if (err) {
      console.error('Error fetching playlist items:', err);
      res.status(500).send('Error fetching playlist items');
      return;
    }
    //next step is to display items in the playlist based on this response 
    res.send(resp.data);
  });
});

app.get("/convert", function(req, res) {
  // console.log("conert");
  const apiUrl = 'https://api.spotify.com/v1/search';
  const token = req.headers.authorization; // Replace with your actual Spotify API access token
  const trackName = req.query.trackName;
  const params = {
        q: `track:${trackName}`,
        type: 'track'
  };
  const headers = {
  'Authorization': `Bearer ${token}`
  };

  axios.get(apiUrl, {
    params: params,
    headers: headers
  })
  .then(response => {
    // console.log(response.data.tracks.items);
    //OK what I want is the
    res.send(response.data.tracks.items);

  })
  .catch(error => {
    console.error(error);
  });
});


app.get("/createSpotifyPlaylist", function(req, res) {
  //this is a post request I need the user id where do I get that 
  //ok I am getting the spotify id here 

  const getId = "https://api.spotify.com/v1/me";
  const token = req.headers.authorization; // Replace with your actual Spotify API access token
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  const user_info = axios.get(getId,{
      headers: headers
  })
  .then(response => {
    const apiUrl =  `https://api.spotify.com/v1/users/${response.data.id}/playlists`;  
    const data = {
      name: req.query.playlistName,
      description: 'New playlist description',
      public: true
    };
 
    axios.post(apiUrl, data, { headers })
      .then(response => {
        console.log(response.data);
        res.send(response.data);
      })
      .catch(error => {
      });

    })
});


app.post("/appendToPlaylistSpotify", function(req,res){
    console.log("Full Request Body:", req.body);
    const token = req.headers.authorization;
    const playlistID = req.query.playlistID;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    const data = {
      uris : req.body.data
    };
    const append_url = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`
    axios.post(append_url,data,{headers}).then(response => {
        console.log(response)
    }).catch(error => {
      console.error("error",error);
    })



})
console.log('Listening on 8888');

if(spotify_client_id !== undefined){
  app.listen(3000);
}
