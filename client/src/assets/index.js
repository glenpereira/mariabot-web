import play from "./play.png"
import pause from "./pause.png"
import skip_left from "./skip_left.png"
import skip_right from "./skip_right.png"

const tracks = [
  {
    id: 1,
    text: "sample",
    src: "https://mariabot.s3.ap-south-1.amazonaws.com/audio/Just+the+Two+of+Us.mp3",
    author: "Glen Pereira"
  },
  {
    id: 2,
    text: "Hi there",
    src: "https://mariabot.s3.ap-south-1.amazonaws.com/audio/Just+the+Two+of+Us.mp3",
    author: "Glen Pereira"
  }
]

export {
  tracks,
  play,
  pause,
  skip_left,
  skip_right
}