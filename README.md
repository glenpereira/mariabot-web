# Mariabot Web

A React app that demonstrates the functioning of [Mariabot](https://github.com/glenpereira/MariaBot) - A Malayalam Text-To-Speech Engine built using a custom trained Tacotron2 model.

![Mariabot working](https://i.ibb.co/m5DNkSL/Mariabot.gif)

Mariabot takes in malayalam text by using a Malayalam [IME](#subins2000) (Input Method Engine), transliterates it to manglish and then sends the input text to the server hosting the [TTS engine](https://github.com/glenpereira/MariaBot).

The generated audio file is then received by a node backend and stores it in a configurable AWS bucket while it's metadata is pushed to a MongoDB database. It then retrieves all the audio files present in the db and displays it along with it's text.

### Installation

1. Clone the repo and run `npm install`
2. Clone the [Mariabot](https://github.com/glenpereira/MariaBot) TTS model and install it.
3. Create a .env file in client/src and define two variables pointing to the address hosting the Node server and the model's python server.
4. Change dbUrl in server/src/db.js to your MongoDB server address.
5. Run the app: `npm run dev`

### Credits

* <a id="subins2000">[subins2000](https://github.com/varnamproject/webpage-embed-plugin)</a>  for creating the Malayalam IME as part of the [varnam project](https://github.com/varnamproject)

* [knadh](https://github.com/knadh/ml2en) for writing the script that transliterates malayalam text to manglish.

* [Parapsychic](https://github.com/parapsychic/malayalam-tacotron2) for training the Tacotron2 model from which [Mariabot](https://github.com/glenpereira/MariaBot) is derived.

### Other projects

A list of other apps that use Mariabot TTS.

* A [bus announcement](https://github.com/mathai-ai/bus_terminal_announcement) app that generates an announcement for buses that arrive in a bus station.

* A [discord bot](https://github.com/Anandusunil1909/MariaBot) that generates a speaking portrait that talks in malayalam.