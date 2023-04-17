// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


export default function handler(req, res) {
  const googleTTS = require('google-tts-api'); // CommonJS
  const { message = "Hello World" } = req.body;

  // get base64 text
  const results = googleTTS.getAllAudioUrls(message, {
    lang: 'en',
    slow: false,
    host: 'https://translate.google.com',
    splitPunct: ',.?',
  });
  console.log(results);
  res.status(200).json(results)

}
