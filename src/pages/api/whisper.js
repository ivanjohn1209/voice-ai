// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


export default async function handler(req, res) {
    const dotenv = require('dotenv').config();
    const axios = require('axios');
    const fs = require('fs');
    const path = require('path');
    const FormData = require('form-data');
    const { fileURL } = req.body;

    const OPENAI_API_KEY = "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";
    const fileUrl = fileURL;
    const model = "whisper-1";

    axios({
        method: 'get',
        url: fileUrl,
        responseType: 'arraybuffer'
    }).then(function (response) {
        const formData = new FormData();
        formData.append('model', model);
        formData.append('file', Buffer.from(response.data), { filename: 'translate_tts.mp3' });

        axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
            headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
            }
        })
            .then((response) => {
                res.status(200).json(response.data)

            })
            .catch((error) => {
                res.status(400).json(error.response)
            })
    });
    // const configuration = new Configuration({
    //     apiKey: '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',
    // });

    // const openai = new OpenAIApi(configuration);
    // const response = await openai.createTranscription(
    //     buffer, // The audio file to transcribe.
    //     "whisper-1", // The model to use for transcription.
    //     undefined, // The prompt to use for transcription.
    //     'json', // The format of the transcription.
    //     1, // Temperature
    //     'en' // Language
    // )

    // console.log(response);
    // res.status(200).json(response)

}
