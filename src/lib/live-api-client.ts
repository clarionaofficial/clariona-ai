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
                    response_modalities: ["audio"],
                    speech_config: {
                        voice_config: {
                            prebuilt_voice_config: {
                                voice_name: "Puck"
                            }
                        }
                    }
                },
                realtime_input_config: {
                    automatic_activity_detection: {
                        silence_duration_ms: 1000
                    }
                },
                system_instruction: {
                    parts: [{ text: "You are Clariona AI, a world-class, CONCISE voice-only assistant. CRITICAL VOICE-ONLY RULES: 1. NEVER include internal monologue, thinking steps, or planning. 2. NEVER start a response with headers or bold text like '**Acknowledge...**'. 3. SPEAK NORMALLY as if on a phone call. 4. DO NOT use markdown or any symbols. 5. KEEP RESPONSES TO 1-2 SHORT SENTENCES MAX. Be direct, helpful, and natural." }]
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

    private async handleMessage(event: MessageEvent) {
        try {
            let data = event.data;
            if (data instanceof Blob) {
                data = await data.text();
            }
            const message = JSON.parse(data);
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
