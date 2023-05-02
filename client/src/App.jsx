import React, { useState, useEffect } from "react";
import axios from "axios";
import { useScript } from "./utils/useScript";
const API_SOURCE = import.meta.env.VITE_MARIABOT_API_URL;
const MODEL_API_URL = `http://${API_SOURCE}/text`;
import ml2en from "./utils/ml2en";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [manglishText, setManglishText] = useState("")

  const loadVarnam = () => {
    const input = document.getElementById("input");
    window["plugVarnam"](input, {
      schemeID: "ml",
    });
  };

  useScript({ url: "https://api.varnamproject.com/embed.js", onLoad: loadVarnam });

  async function handleSubmit(e) {
    setManglishText(ml2en(inputText))
    e.preventDefault();
    const text = {
      text: manglishText,
    };
    await axios
      .post(MODEL_API_URL, text, { responseType: "blob" })
      .then((res) => {
        //create file link in browser's memory
        const url = window.URL.createObjectURL(new Blob([res.data]));

        //create "a" HTML element with href to file and click
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "sample.wav"); // or any other extension
        document.body.appendChild(link);
        link.click();

        //clean up "a" element & remove objecturl
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <div className="title">
        <h1>MariaBot</h1>
        <div className="title-caption">
          <h2>Malayalam TTS using Tacotron2 and Waveglow</h2>
        </div>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="text-form">
          <label>
            Type here:{" "}
            <textarea
              id="input"
              name="myInput"
              type="text"
              value={inputText}
              placeholder="Type Manglish text here."
              onChange={(e) => setInputText(e.target.value)}
              className="input-field"
            />
          </label>
          <p>{manglishText}</p>
          <button type="submit" className="submit-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
