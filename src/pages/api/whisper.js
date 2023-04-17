import axios from 'axios';

export default async function handler(req, res) {
    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/audio/transcriptions';
    const { audioUrl } = req.body;

    try {
        const response = await axios({
            method: 'post',
            url: apiUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            data: {
                audio_url: audioUrl,
                model: 'whisper-2',
                prompt: 'Transcribe the following audio:',
                max_tokens: 1024
            }
        });

        res.status(200).json(response.data.choices)
    } catch (error) {
        console.error(error);
        res.status(error.code).json(error)
    }
}
