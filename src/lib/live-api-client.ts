class Emitter {
    private listeners: { [key: string]: Function[] } = {};

    on(event: string, fn: Function) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(fn);
    }

    emit(event: string, ...args: any[]) {
        (this.listeners[event] || []).forEach(fn => fn(...args));
    }
}

export class LiveAPIClient extends Emitter {
    private ws: WebSocket | null = null;
    private config: any;

    constructor(config: { apiKey: string; model: string }) {
        super();
        this.config = config;
    }

    async connect() {
        const url = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=${this.config.apiKey}`;

        this.ws = new WebSocket(url);

        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Connection timeout'));
            }, 10000);

            this.ws!.onopen = () => {
                console.log('Connected to Gemini Live API');
                this.sendSetupMessage();
            };

            this.on('setupComplete', () => {
                clearTimeout(timeout);
                resolve(true);
            });

            this.ws!.onmessage = (event) => {
                this.handleMessage(event);
            };

            this.ws!.onclose = (event) => {
                console.log(`Disconnected from Gemini Live API. Code: ${event.code}, Reason: ${event.reason}`);
                clearTimeout(timeout);
                this.emit('close');
            };

            this.ws!.onerror = (error) => {
                console.error('WebSocket Error:', error);
                clearTimeout(timeout);
                reject(error);
            };
        });
    }

    private sendSetupMessage() {
        const setupMessage = {
            setup: {
                model: `models/${this.config.model}`,
                generation_config: {
                    response_modalities: ["audio"]
                },
                system_instruction: {
                    parts: [{ text: "You are Clariona AI, a helpful voice assistant for Clariona AI agency. You help people with website building, GMB ranking, and AI voice agents. Keep responses concise and friendly for a voice conversation." }]
                }
            }
        };
        console.log('Sending setup message:', setupMessage);
        this.ws?.send(JSON.stringify(setupMessage));
    }

    sendAudio(base64Audio: string) {
        if (this.ws?.readyState === WebSocket.OPEN) {
            const message = {
                realtime_input: {
                    media_chunks: [
                        {
                            mime_type: "audio/pcm;rate=16000",
                            data: base64Audio
                        }
                    ]
                }
            };
            this.ws.send(JSON.stringify(message));
        }
    }

    private handleMessage(event: MessageEvent) {
        try {
            const message = JSON.parse(event.data);
            console.log('Gemini Message:', message);

            if (message.serverContent?.modelTurn?.parts) {
                for (const part of message.serverContent.modelTurn.parts) {
                    if (part.inlineData) {
                        this.emit('audio', part.inlineData.data);
                    }
                    if (part.text) {
                        this.emit('text', part.text);
                    }
                }
            }
            if (message.setupComplete) {
                console.log('Gemini Setup Complete');
                this.emit('setupComplete');
            }
        } catch (e) {
            console.error('Error parsing Gemini message:', e);
        }
    }

    disconnect() {
        this.ws?.close();
        this.ws = null;
    }
}
