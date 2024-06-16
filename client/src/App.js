import './App.css';

//Importing the GoogleAuthProvider so that we can use the Google Login.
import { GoogleOAuthProvider } from "@react-oauth/google";

//Component Imports
import Messanger from './Components/Messanger';
import AccountProvider from './Context/AccountProvider';

function App() {
  //GoogleAuthProvider requires a clientId prop to be passed in. So we first create a clientId variable and pass it as a prop.
  const clientId = "518163594462-l520jem3oaarn90shbg8ctbmingp16i6.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId} className="App">
      <AccountProvider>
        <Messanger />
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
