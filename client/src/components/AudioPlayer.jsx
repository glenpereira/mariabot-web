import {useState, useRef} from "react"
import styles from '../styles/AudioPlayer.module.css'
import Controls from './Controls';
import DisplayTrack from './DisplayTrack';
import ProgressBar from './ProgressBar';

import { tracks } from "../assets";

const AudioPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const audioRef = useRef()

  return (
    <div className={styles["audio-player"]}>
      <DisplayTrack audioRef={audioRef} currentTrack={currentTrack}/>
      <Controls audioRef={audioRef}/>
      <ProgressBar/>
    </div>
  );
};
export default AudioPlayer;