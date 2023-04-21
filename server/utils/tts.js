const gTTS = require("gtts");

let speech = "Hello University of Hyderabad";
const gtts = new gTTS(speech, "en");

gtts.save("Voice.mp3", function (err, result) {
  if (err) {
    throw new Error(err);
  }
  console.log("Text to speech converted!");
});
