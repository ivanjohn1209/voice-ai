import { createHash } from 'crypto'

export default async (req, res) => {
    // Verify the request signature
    const signature = req.headers['x-zm-signature']
    const payload = await getPayload(req)
    const expectedSignature = createHash('sha256')
        .update(process.env.ZOOM_API_SECRET + payload)
        .digest('base64')
    if (signature !== expectedSignature) {
        return res.status(401).send('Unauthorized')
    }

    // Check if the event is a recording completed event
    const event = req.body.event
    if (event !== 'recording.completed') {
        return res.status(200).send('OK')
    }

    // Get the cloud recording download URL
    const recording = req.body.payload.object
    const recordingId = recording.uuid
    const recordingDownloadUrl = await getRecordingDownloadUrl(recordingId)

    // Transcribe the audio using the OpenAI API
    // const transcription = await transcribeAudio(recordingDownloadUrl)

    // Handle the transcription result
    // console.log('Transcription result:', transcription)
    // TODO: Do something with the transcription result
    console.log(recordingDownloadUrl)
    // Return a success response
    res.status(200).send('OK')
}

async function getPayload(req) {
    return new Promise((resolve, reject) => {
        let payload = ''
        req.on('data', (chunk) => {
            payload += chunk
        })
        req.on('end', () => {
            resolve(payload)
        })
        req.on('error', (err) => {
            reject(err)
        })
    })
}

async function getRecordingDownloadUrl(recordingId) {
    const response = await axios.get(`https://api.zoom.us/v2/meetings/${recordingId}/recordings`, {
        headers: {
            Authorization: `Bearer ${process.env.ZOOM_API_KEY}`,
        },
    })
    const downloadUrl = response.data.recording_files.find((file) => file.file_type === 'TRANSCRIPT').download_url
    return downloadUrl;
}

async function transcribeAudio(downloadUrl) {

}