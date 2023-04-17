import { useState } from 'react';
import axios from 'axios';
function AiVoice() {
    const [transcript, setTranscript] = useState('');
    const [aiResponse, setAiResponse] = useState('');

    const handleTranscript = (event) => {
        setTranscript(event.results[0][0].transcript);
        var data = JSON.stringify({
            "message": event.results[0][0].transcript
        });

        var config = {
            method: 'post',
            url: 'http://localhost:3000/api/ai',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then((response) => {
                setAiResponse(response.data.message)
            })
            .catch((error) => {
                console.log(error);
            });

    };

    const startRecognition = () => {
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.onresult = handleTranscript;
        recognition.start();
    };

    return (
        <div>
            <button onClick={startRecognition}>Start recording</button>
            <p>Transcript: {transcript}</p>
            <p>AI Response: {aiResponse}</p>
        </div>
    );
}

export default AiVoice