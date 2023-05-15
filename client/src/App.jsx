import { useState, useEffect } from "react";
import axios from "axios";
import { useScript } from "./utils/useScript";
const API_SOURCE = import.meta.env.VITE_MARIABOT_API_URL;
const SERVER_SOURCE = import.meta.env.VITE_MARIABOT_SERVER_URL;
const MODEL_API_URL = `${API_SOURCE}/text`;
const SERVER_URL = `${SERVER_SOURCE}/audio`;
import ml2en from "./utils/ml2en";

import { play } from "./assets";
import AudioPlayer from "./components/AudioPlayer";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [postData, setPostData] = useState({
    text: "",
    author: "",
  });
  const [manglishText, setManglishText] = useState("");
  const [fileName, setFileName] = useState("");
  const [audioData, setAudioData] = useState([]);
  const [audioMetadata, setAudioMetadata] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    let spaceTimeout = "";
    window.addEventListener("keydown", (event) => {
      spaceTimeout = setTimeout(() => {
        setInputText(event.target.value);
        console.log("in useeffect " + event.target.value);
      }, 2000);
    });

    return () => {
      console.log("cleanup timeout");
      clearTimeout(spaceTimeout);
    };
  }, [inputText]);

  function inputHandler(event) {
    setInputText(event.target.value);
    console.log(event.target.value);
  }

  const loadVarnam = () => {
    const input = document.getElementById("input");
    window["plugVarnam"](input, {
      schemeID: "ml",
    });
  };

  useScript({
    url: "https://api.varnamproject.com/embed.js",
    onLoad: loadVarnam,
  });

  // function downloadFile() {
  //   //deprecated function to download file directly from browser
  //   //create file link in browser's memory
  //   const url = window.URL.createObjectURL(new Blob([res.data]));
  //   console.log(res.data);
  //   //create "a" HTML element with href to file and click
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.setAttribute("download", fileName + ".wav"); // or any other extension
  //   document.body.appendChild(link);
  //   link.click();

  //   //clean up "a" element & remove objecturl
  //   document.body.removeChild(link);
  //   URL.revokeObjectURL(url);
  //   console.log(res);
  // }

  async function getAudioList() {
    await axios.get(SERVER_URL).then((res) => {
      console.log(res.data);
      setAudioData(res.data);
    });
    console.log(audioData);
  }

  async function postAudioMetadata(data) {
    await axios
      .post(SERVER_URL, data)
      .then((res) => {
        setAlertMessage(res.data.message);
        console.log(`Alert Message: ${alertMessage}`);
      })
      .catch((err) => {
        console.log(err);
      });
    getAudioList();
  }

  async function postInputText(data) {
    await axios
      .post(MODEL_API_URL, data)
      .then((res) => {
        setAudioMetadata(res.data);
        console.log(res.data);
        console.log(audioMetadata);
        postAudioMetadata(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function deleteAudio(name) {
    await axios
      .delete(`${SERVER_URL}/${name}`)
      .then((res) => {
        setAlertMessage(res.data.message);
        console.log(`Alert Message: ${alertMessage}`);
      })
      .catch((error) => {
        console.log(error);
      });
    getAudioList();
  }

  useEffect(() => {
    getAudioList();
    console.log("calling audio from database");
  }, []);

  useEffect(() => {
    console.log(typeof inputText)
    if(inputText === undefined){
      return
    }
    setManglishText(ml2en(inputText));
  }, [inputText]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Malayalam text: " + manglishText);
    if (inputText.trim() === "") {
      return;
    }
    const text = {
      text: manglishText,
      author: "glen",
    };
    setPostData((postData) => ({
      ...postData,
      ...text,
    }));
    console.log(text);
    console.log(postData);
    postInputText(text);
  }

  return (
    <div className="parent">
      <div className="title">
        <h1>MariaBot</h1>
        <div className="title-caption">
          <h2>Malayalam TTS using Tacotron2 and Waveglow</h2>
        </div>
      </div>

      <div className="form-container">
        {/* <div className="play-container">
          <a href="#">
            <img src={play} alt="play-button" className="play-button"></img>
          </a>
        </div> */}
        <form onSubmit={handleSubmit} className="text-form">
          <textarea
            id="input"
            name="myInput"
            type="text"
            value={inputText}
            placeholder="Type Manglish text here."
            onChange={inputHandler}
            className="input-field"
          />
          {/* <p>{manglishText}</p> */}
          {/* <p>{inputText}</p> */}
          <button type="submit" className="submit-button">
            Send
          </button>
        </form>
      </div>
      <ul className="audio-list">
        {[...audioData].reverse().map((track) => (
          <AudioPlayer
            key={track._id}
            audioSource={track.src}
            audioText={track.text}
            audioName={track.name}
            deleteAudio={deleteAudio}
          />
        ))}
      </ul>
      {/* <AudioPlayer /> */}
    </div>
  );
};

export default App;
