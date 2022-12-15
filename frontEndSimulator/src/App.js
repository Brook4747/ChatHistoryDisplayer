import { useState, useTimeout } from "react";
import axios from "axios";
import "./styling/index.css";
function App() {
  // State variables
  const [fileName, setFileName] = useState("");
  const [initText, setInitText] = useState("");
  const [resp, setResp] = useState("");
  const [uid, setUID] = useState("");
  const [checkFileText, setCheckFileText] = useState("");

  //Get request handler
  function sendGet(endpoint) {
    const url = `http://localhost:4567/${endpoint}`;
    axios.get(url).then((response) => {
      console.log(response.data);
      setResp(JSON.stringify(response.data));
    });
  }

  //Post request handler
  function sendPost(endpoint, body) {
    const url = `http://localhost:4567/${endpoint}`;
    axios.post(url, body).then((response) => {
      console.log(response.data);
      setResp(JSON.stringify(response.data));
    });
  }

  return (
    <div className="App">
      <div className="c">
        <h1> Ontrack Simulator</h1>
        <h3> UID set to {uid}</h3>
      </div>
      <div className="c">
        <div className="buttonRow">
          {/*Initialising a repo */}
          <div className="buttonContainer">
            <input
              type="text"
              placeholder="repo uid"
              value={initText}
              onInput={(e) => setInitText(e.target.value)}
            ></input>
            <button
              className="button"
              onClick={() => {
                sendGet(`init/${initText}`);
                setUID(initText);
                setInitText("");
                const obj = `
              {
                "requiredFiles":[
                  "summary.txt",
                  "report.txt"
                ]
              }`;
                sendPost(`requiredFiles/${initText}`, obj);
              }}
            >
              Initialise a repo
            </button>
          </div>

          {/*Submiting a file */}
          <div className="buttonContainer">
            <input
              type="text"
              placeholder="file name"
              value={fileName}
              onInput={(e) => setFileName(e.target.value)}
            ></input>
            <button
              className="button"
              onClick={() => {
                const body = `{
                "fileName" : "${fileName}",
                "fileContents": "Randomfile contents here. This would be a PDF in the final product"
              }`;
                sendPost(uid, body);
                setFileName("");
              }}
            >
              Submit a file
            </button>
          </div>

          {/*Checking if a file was submitted*/}
          <div className="buttonContainer">
            <input
              type="text"
              placeholder="file name"
              value={checkFileText}
              onInput={(e) => setCheckFileText(e.target.value)}
            ></input>
            <button
              className="button"
              onClick={() => {
                console.log(`diff/${uid}/${checkFileText}.txt`);
                sendGet(`diff/${uid}/${checkFileText}.txt`);
                setCheckFileText("");
              }}
            >
              Check a file
            </button>
          </div>

          {/*Checking status of required files `checkUploadStatus */}
          <div className="buttonContainer">
            <br />
            <button
              className="button"
              onClick={() => {
                console.log(`checkUploadStatus/${uid}`);
                sendGet(`checkUploadStatus/${uid}`);
              }}
            >
              Check upload status
            </button>
          </div>
        </div>
        {/* Responses from the server  */}
        <div className="respContainer">
          <strong>Response</strong>
          <div className="breaker"></div>
          <p>{resp}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
