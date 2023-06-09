import crypto from 'crypto';
export default async (req, res) => {
    var response

    console.log(req.headers)
    console.log(req.body)

    // construct the message string
    const message = `v0:${req.headers['x-zm-request-timestamp']}:${JSON.stringify(req.body)}`

    const hashForVerify = crypto.createHmac('sha256', process.env.ZOOM_SECRET_TOKEN).update(message).digest('hex')
    // hash the message string with your Webhook Secret Token and prepend the version semantic
    const signature = `v0=${hashForVerify}`

    // you validating the request came from Zoom https://marketplace.zoom.us/docs/api-reference/webhook-reference#notification-structure
    if (req.headers['x-zm-signature'] === signature) {

        // Zoom validating you control the webhook endpoint https://marketplace.zoom.us/docs/api-reference/webhook-reference#validate-webhook-endpoint
        if (req.body.event === 'endpoint.url_validation') {
            const hashForValidate = crypto.createHmac('sha256', process.env.ZOOM_SECRET_TOKEN).update(req.body.payload.plainToken).digest('hex')

            response = {
                message: {
                    plainToken: req.body.payload.plainToken,
                    encryptedToken: hashForValidate
                },
                status: 200
            }

            console.log(response.message)

            res.status(response.status)
            res.json(response.message)
        } else {
            // if (req.body.event === 'meeting.started') {
            //     const { object } = req.body.payload;
            //     const { uuid } = object;
            //     console.log(`Started meeting ${uuid}`);
            // }
            // if (req.body.event === 'meeting.participant_joined') {
            //     const { object } = req.body.payload;
            //     const { id: participantId, host_id: meetingId } = object;
            //     console.log(`Participant ${participantId} joined meeting ${meetingId}`);
            //     const streamUrl = `https://api.zoom.us/v2/meetings/${meetingId}/participants/${participantId}/audio`;
            //     const whisperUrl = 'https://api.openai.com/v1/engines/whisper-1/stream/start';
            //     const headers = {
            //         Authorization: `Bearer ${process.env.WHISPER_API_KEY}`,
            //         'Content-Type': 'application/json',
            //     };
            //     const data = {
            //         url: streamUrl,
            //         model: 'whisper',
            //     };
            //     console.log(streamUrl)
            //     const whisperResponse = await axios.post(whisperUrl, data, { headers });
            //     const { session_id: sessionId } = whisperResponse.data;
            //     const transcriptUrl = `https://api.openai.com/v1/engines/whisper-1/stream/${sessionId}/text`;
            //     const transcriptStream = new EventSource(transcriptUrl);
            //     transcriptStream.onmessage = (event) => {
            //         const { text } = JSON.parse(event.data);
            //         console.log(`Transcription: ${text}`);
            //         const messageUrl = `https://api.zoom.us/v2/chat/users/me/messages`;
            //         const zoomHeaders = {
            //             Authorization: `Bearer ${process.env.ZOOM_API_KEY}`,
            //             'Content-Type': 'application/json',
            //         };
            //         const messageData = {
            //             to_contact: `meeting_${meetingId}`,
            //             message: {
            //                 message: text,
            //             },
            //         };
            //         axios.post(messageUrl, messageData, { headers: zoomHeaders });
            //     };
            // }

            response = { message: 'Authorized request to Zoom Webhook sample.', status: 200 }

            // console.log(response.message)

            res.status(response.status)
            res.json(response)

            // business logic here, example make API request to Zoom or 3rd party

        }
    } else {

        response = { message: 'Unauthorized request to Zoom Webhook sample.', status: 401 }

        // console.log(response.message)

        res.status(response.status)
        res.json(response)
    }
    // if (req.method === 'POST') {
    //     // Respond to the validation request
    //     const params = req.query
    //     const verifyToken = process.env.ZOOM_VERIFICATION_TOKEN
    //     if (params.verify_token === verifyToken) {
    //         res.status(200).json({ verify_token: params.verify_token })
    //     } else {
    //         res.status(401).send('Unauthorized')
    //     }
    // } else {
    //     // Verify the request signature
    //     const signature = req.headers['x-zm-signature']
    //     const payload = await getPayload(req)
    //     const expectedSignature = createHash('sha256')
    //         .update(process.env.ZOOM_API_SECRET + payload)
    //         .digest('base64')
    //     if (signature !== expectedSignature) {
    //         return res.status(401).send('Unauthorized')
    //     }

    //     // Check if the event is a recording completed event
    //     const event = req.body.event
    //     if (event !== 'recording.completed') {
    //         return res.status(200).send('OK')
    //     }

    //     // Get the cloud recording download URL
    //     const recording = req.body.payload.object
    //     const recordingId = recording.uuid
    //     const recordingDownloadUrl = await getRecordingDownloadUrl(recordingId)

    //     // Transcribe the audio using the OpenAI API
    //     // const transcription = await transcribeAudio(recordingDownloadUrl)

    //     // Handle the transcription result
    //     // console.log('Transcription result:', transcription)
    //     // TODO: Do something with the transcription result
    //     console.log(recordingDownloadUrl)
    //     // Return a success response
    //     res.status(200).send('OK')
    // }
}

