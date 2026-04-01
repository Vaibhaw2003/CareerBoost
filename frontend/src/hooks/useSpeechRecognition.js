import { useState, useEffect, useCallback } from 'react';

export const useSpeechRecognition = () => {
    const [transcript, setTranscript] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);
    const [supported, setSupported] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                setSupported(false);
                return;
            }

            const recog = new SpeechRecognition();
            recog.continuous = true;
            recog.interimResults = true;
            recog.lang = 'en-US';

            recog.onresult = (event) => {
                let currentTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const trans = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        currentTranscript += trans + ' ';
                    } else {
                        currentTranscript += trans;
                    }
                }
                setTranscript(prev => prev + currentTranscript);
            };

            recog.onerror = (event) => {
                console.error('Speech recognition error', event.error);
                setIsListening(false);
            };

            recog.onend = () => {
                 setIsListening(false);
            };

            setRecognition(recog);
        }
    }, []);

    const startListening = useCallback(() => {
        if (recognition) {
            setTranscript('');
            setIsListening(true);
            try {
                recognition.start();
            } catch (e) {
                console.error(e);
            }
        }
    }, [recognition]);

    const stopListening = useCallback(() => {
        if (recognition) {
            setIsListening(false);
            recognition.stop();
        }
    }, [recognition]);

    return {
        transcript,
        isListening,
        supported,
        startListening,
        stopListening,
        setTranscript
    };
};
