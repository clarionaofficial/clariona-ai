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
        const url = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BiDiGenerateContent?key=${this.config.apiKey}`;

        this.ws = new WebSocket(url);
        this.ws.binaryType = 'arraybuffer';

        return new Promise((resolve, reject) => {
            this.ws!.onopen = () => {
                console.log('Connected to Gemini Live API');
                this.sendSetupMessage();
                resolve(true);
            };

            this.ws!.onmessage = (event) => {
                this.handleMessage(event);
            };

            this.ws!.onclose = () => {
                console.log('Disconnected from Gemini Live API');
                this.emit('close');
            };

            this.ws!.onerror = (error) => {
                console.error('WebSocket Error:', error);
                reject(error);
            };
        });
    }

    private sendSetupMessage() {
        const setupMessage = {
            setup: {
                model: `models/${this.config.model}`,
                generation_config: {
                    response_modalities: ["AUDIO"]
                }
            }
        };
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
