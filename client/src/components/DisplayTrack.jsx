/* eslint-disable react/prop-types */


const DisplayTrack = ({currentTrack, audioRef}) => {
  console.log(audioRef)
  return (
    <div>
      <audio src={currentTrack.src} ref={audioRef}></audio>
    </div>
  );
};
export default DisplayTrack;
