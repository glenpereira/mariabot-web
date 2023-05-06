import {useState, useRef} from "react"
import styles from '../styles/AudioPlayer.module.css'
import Controls from './Controls';
import DisplayTrack from './DisplayTrack';
import ProgressBar from './ProgressBar';

import { tracks } from "../assets";

const AudioPlayer = ({audioSource, audioText}) => {
  // const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef()
  const progressBarRef = useRef()

  console.log(audioSource)

  return (
    <div className={styles["audio-player"]}>
      <DisplayTrack {...{audioRef, audioSource, audioText, setDuration, progressBarRef}}/>
      <Controls {...{audioRef, progressBarRef, duration, setTimeProgress}}/>
      <ProgressBar {...{progressBarRef, audioRef, timeProgress, duration}}/>
    </div>
  );
};
export default AudioPlayer;