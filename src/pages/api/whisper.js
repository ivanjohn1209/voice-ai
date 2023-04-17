// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


const { Configuration, OpenAIApi } = require("openai");
import multiparty from 'multiparty'

export default async function handler(req, res) {
    const buffer = req.body;
    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
        if (err) throw err

        console.log(fields.fieldName)

        // res.status(200).json({ value })
    })
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
