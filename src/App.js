import './App.css';
import { GoogleLoginBtn } from './components/GoogleLoginBtn';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';

const CLIENT_ID=process.env.REACT_APP_CLIENT_ID;
const API_KEY=process.env.REACT_APP_API_KEY;
const SCOPES=process.env.REACT_APP_SCOPES;

function App() {

  useEffect(() => {
    function start(){
      gapi.client.init({ 
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES,
        discoveryDocs:["https://docs.googleapis.com/$discovery/rest?version=v1"],    
      })
    };
    gapi.load('client:auth2', start);
  })

  const execute = () => {
    console.log(gapi.client.docs);
    return gapi.client.docs.documents.create({
      "resource": {
        "title": "mi titulo",
        "body": {
          "content": [
            {
              "paragraph": {
                "elements": [
                  {
                    "textRun": {
                      "content": "mi texto genial"
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }

  return (
    <div className="App">
      <GoogleLoginBtn/>
      <button onClick={execute}>
        Crear documento
      </button>
    </div>
  );
}

export default App;
