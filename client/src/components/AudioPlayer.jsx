import { useState, useRef } from "react";
import styles from "../styles/AudioPlayer.module.css";
import Controls from "./Controls";
import DisplayTrack from "./DisplayTrack";
import ProgressBar from "./ProgressBar";
import "../index.css";

import { trash } from "../assets";

const AudioPlayer = ({ audioSource, audioText, deleteAudio, audioName }) => {
  // const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef();
  const progressBarRef = useRef();

  function deleteAudioHandler() {
    deleteAudio(audioName);
    console.log("Deleted Audio: " + audioName);
  }

  return (
    <div className={styles["audio-player-container"]}>
      <div className={styles["audio-text"]}>
        <p>{audioText}</p>
      </div>
      <div className={styles["audio-player"]}>
        <DisplayTrack
          {...{ audioRef, audioSource, setDuration, progressBarRef }}
        />
        <Controls
          {...{ audioRef, progressBarRef, duration, setTimeProgress }}
        />
        <ProgressBar
          {...{ progressBarRef, audioRef, timeProgress, duration }}
        />
        <div className={`${styles.controls} ${styles.controls_trash}`}>
          <button onClick={deleteAudioHandler}>
            <img src={trash} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default AudioPlayer;
