import axios from 'axios';
import crypto from 'crypto';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { headers, body } = req;
        const event = headers['x-zoom-event'];
        const signature = headers['x-zoom-signature'];
        const expectedSignature = crypto
            .createHmac('sha256', process.env.ZOOM_API_SECRET)
            .update(`${process.env.ZOOM_VERIFICATION_TOKEN}${headers['x-zoom-timestamp']}${JSON.stringify(body)}`)
            .digest('base64');

        if (signature !== expectedSignature) {
            return res.status(401).json({ message: 'Invalid signature' });
        }

        switch (event) {
            case 'meeting.started':
                // handle meeting started event
                break;
            case 'meeting.ended':
                // handle meeting ended event
                break;
            case 'recording.completed':
                // handle recording completed event
                break;
            default:
                return res.status(400).json({ message: 'Unknown event type' });
        }

        return res.status(200).json({ message: 'Event processed successfully' });
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
