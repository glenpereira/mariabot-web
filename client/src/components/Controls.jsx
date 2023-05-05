/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'

import { play, pause, skip_left, skip_right } from '../assets'

const Controls = ({audioRef}) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev)
  }

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioRef]);

  return (
    <div className="controls-wrapper">
      <div className="controls">
        <button onClick={togglePlayPause}>
          {isPlaying ? <img src={pause}/> : <img src={play}/>}
        </button>
      </div>
    </div>
  )
}

export default Controls