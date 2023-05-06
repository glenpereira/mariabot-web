
const DisplayTrack = ({ audioSource, audioRef, setDuration, progressBarRef }) => {
  const onLoadedMetadata = () => {
    console.log(audioRef.current.duration);
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

  

  return (
    <div>
      <audio
        src={audioSource}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
      ></audio>
    </div>
  );
};
export default DisplayTrack;
