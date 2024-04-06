/**
 * Interface representing props for handling Spotify sign-in status.
 * 
 * @interface SpotifySignInProps
 */
interface SpotifySignInProps {
  /**
   * A boolean indicating whether the user is logged in to Spotify.
   * 
   * @type {boolean}
   */
  spotifyLoggedIn: boolean;

  /**
   * A function to set the login status for Spotify.
   * 
   * @type {React.Dispatch<React.SetStateAction<boolean>>}
   */
  setSpotifyLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * A React functional component for signing in to Spotify using OAuth.
 * This component provides a button to initiate the Spotify OAuth login process.
 * 
 *   @param {Object} SpotifySignInProps - The sign Iprops object containing:
 *   @param {boolean} spotifyLoggedIn - A boolean indicating whether the user is logged in to Spotify.
 *   @param {Function} setSpotifyLoggedIn - A function to set the login status for Spotify.
 * 
 * @returns {JSX.Element} A JSX element representing the Spotify OAuth sign-in component.
 */

const SpotifyOauthSignIn: React.FC<SpotifySignInProps> = ({spotifyLoggedIn,setSpotifyLoggedIn}) => {
  //helper function to redirect user to spotify login on click
  const login = () => {
    if(spotifyLoggedIn === false){

      window.location.href = 'http://localhost:3000/login';
      setSpotifyLoggedIn(true);
      return;
    }
  };

  return (
    <div>
      <button onClick={login}>Sign In to Spotify</button>
    </div>
  );
};

export default SpotifyOauthSignIn;
