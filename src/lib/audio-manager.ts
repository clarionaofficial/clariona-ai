/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class AudioManager {
    private audioContext: AudioContext | null = null;
    private processor: ScriptProcessorNode | null = null;
    private mediaStream: MediaStream | null = null;
    private source: MediaStreamAudioSourceNode | null = null;
    private audioQueue: string[] = [];
    private isPlaying = false;

    async startRecording(onAudioData: (base64: string) => void) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
        this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.source = this.audioContext.createMediaStreamSource(this.mediaStream);

        // Using ScriptProcessorNode for simplicity in this example, 
        // though AudioWorklet is preferred modern standard.
        this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);

        this.source.connect(this.processor);
        this.processor.connect(this.audioContext.destination);

        this.processor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            // Convert Float32 to Int16
            const pcmData = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) {
                pcmData[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7FFF;
            }

            const base64 = btoa(String.fromCharCode(...new Uint8Array(pcmData.buffer)));
            onAudioData(base64);
        };
    }

    stopRecording() {
        this.processor?.disconnect();
        this.source?.disconnect();
        this.mediaStream?.getTracks().forEach(track => track.stop());
        this.audioContext?.close();

        this.processor = null;
        this.source = null;
        this.mediaStream = null;
        this.audioContext = null;
    }

    async playAudio(base64Data: string) {
        this.audioQueue.push(base64Data);
        if (!this.isPlaying) {
            this.playNext();
        }
    }

    private async playNext() {
        if (this.audioQueue.length === 0) {
            this.isPlaying = false;
            return;
        }

        this.isPlaying = true;
        const base64 = this.audioQueue.shift()!;
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }

        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        }

        // Gemini returns PCM data in a specific format usually, 
        // but for simplicity we assume it returns base64 encoded audio bytes 
        // that the browser can decode. Multimodal Live often returns wave chunks.
        try {
            const audioBuffer = await this.audioContext.decodeAudioData(bytes.buffer);
            const source = this.audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(this.audioContext.destination);
            source.onended = () => this.playNext();
            source.start();
        } catch (e) {
            console.error('Error playing audio chunk:', e);
            this.playNext();
        }
    }
}
