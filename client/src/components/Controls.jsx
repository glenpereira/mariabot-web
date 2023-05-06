import { useState, useEffect, useRef, useCallback } from "react";
import styles from "../styles/AudioPlayer.module.css";

import { play, pause, skip_left, skip_right } from "../assets";

const Controls = ({ audioRef, progressBarRef, duration, setTimeProgress }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playAnimationRef = useRef();

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / duration) * 100}%`
    );
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  return (
    <div className={styles["controls-wrapper"]}>
      <div className={styles.controls}>
        <button onClick={togglePlayPause}>
          {isPlaying ? <img src={pause} /> : <img src={play} />}
        </button>
      </div>
      
    </div>
  );
};

export default Controls;
