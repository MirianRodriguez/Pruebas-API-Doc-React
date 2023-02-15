import './App.css';
import { GoogleLoginBtn } from './components/GoogleLoginBtn';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';

const CLIENT_ID='554296606023-876meuumt5vmou76tep6guchu2tucqet.apps.googleusercontent.com'
const API_KEY='AIzaSyCW2mXqEdp0gZ8ov4UCUvnNANJmu9Hm-kg'
const SCOPES='https://www.googleapis.com/auth/documents https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file'

function App() {

  useEffect(() => {
    function start(){
      gapi.client.init({ 
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES,    
      })
    };
    gapi.load('client:auth2', start);
  })

  const createFile = (title) => {
    //const accessToken = gapi.auth.getToken().access_token;
    const accessToken = gapi.client.getToken().access_token;
    console.log("access token" + accessToken);
    fetch('https://docs.googleapis.com/v1/documents?title='+title, {
      method:"POST",
      headers: { 'Authorization': 'Bearer ' + accessToken},
    }).then( (res) => {
      return res.json();
    }).then(function(val){
      console.log(val);
      console.log(val.documentId);
      window.open('https://docs.google.com/document/d/' +val.documentId+ '/edit', '_blank');
    });
  }

  return (
    <div className="App">
      <GoogleLoginBtn/>
      <button onClick={()=>createFile("Mi documento desde React")}>
        Crear documento
      </button>
    </div>
  );
}

export default App;
