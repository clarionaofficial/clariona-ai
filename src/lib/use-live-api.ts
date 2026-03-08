/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { LiveAPIClient } from './live-api-client';
import { AudioManager } from './audio-manager';

export const useLiveAPI = () => {
    const [status, setStatus] = useState<'idle' | 'listening' | 'speaking'>('idle');
    const [transcript, setTranscript] = useState<{ role: 'user' | 'agent'; text: string }[]>([]);
    const clientRef = useRef<LiveAPIClient | null>(null);
    const audioManagerRef = useRef<AudioManager | null>(null);

    const startSession = useCallback(async () => {
        const apiKey = process.env.GEMINI_API_KEY;
        console.log('GEMINI_API_KEY status:', !!apiKey);
        if (!apiKey) {
            console.error('GEMINI_API_KEY is not set');
            return;
        }

        setStatus('listening');

        console.log('Starting session with model: gemini-2.0-flash');
        clientRef.current = new LiveAPIClient({
            apiKey,
            model: 'gemini-2.0-flash'
        });

        if (!audioManagerRef.current) {
            audioManagerRef.current = new AudioManager();
        }

        try {
            await clientRef.current.connect();

            clientRef.current.on('audio', (base64Audio) => {
                setStatus('speaking');
                audioManagerRef.current?.playAudio(base64Audio);
            });

            clientRef.current.on('text', (text) => {
                setTranscript(prev => {
                    const last = prev[prev.length - 1];
                    if (last && last.role === 'agent') {
                        return [...prev.slice(0, -1), { role: 'agent', text: last.text + text }];
                    }
                    return [...prev, { role: 'agent', text }];
                });
            });

            await audioManagerRef.current.startRecording((base64) => {
                clientRef.current?.sendAudio(base64);
            });

        } catch (e) {
            console.error('Failed to start session:', e);
            setStatus('idle');
        }
    }, []);

    const stopSession = useCallback(() => {
        clientRef.current?.disconnect();
        audioManagerRef.current?.stopRecording();
        setStatus('idle');
    }, []);

    return {
        status,
        transcript,
        startSession,
        stopSession
    };
};
