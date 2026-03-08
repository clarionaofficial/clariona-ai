/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class AudioManager {
    private audioContext: AudioContext | null = null;
    private processor: ScriptProcessorNode | null = null;
    private mediaStream: MediaStream | null = null;
    private source: MediaStreamAudioSourceNode | null = null;
    private sampleRate = 16000;
    private outSampleRate = 24000;

    async startRecording(onAudioData: (base64: string) => void) {
        try {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: this.sampleRate });
            this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.source = this.audioContext.createMediaStreamSource(this.mediaStream);

            this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);

            this.source.connect(this.processor);
            this.processor.connect(this.audioContext.destination);

            this.processor.onaudioprocess = (e) => {
                const inputData = e.inputBuffer.getChannelData(0);
                const pcmData = new Int16Array(inputData.length);
                for (let i = 0; i < inputData.length; i++) {
                    pcmData[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7FFF;
                }

                const base64 = this.arrayBufferToBase64(pcmData.buffer);
                onAudioData(base64);
            };
            console.log('Recording started');
        } catch (e) {
            console.error('Error starting recording:', e);
            throw e;
        }
    }

    private arrayBufferToBase64(buffer: ArrayBuffer): string {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
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
        console.log('Recording stopped');
    }

    async playAudio(base64Data: string) {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: this.outSampleRate });
        }

        try {
            const binary = atob(base64Data);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
                bytes[i] = binary.charCodeAt(i);
            }

            const pcm16 = new Int16Array(bytes.buffer);
            const float32 = new Float32Array(pcm16.length);
            for (let i = 0; i < pcm16.length; i++) {
                float32[i] = pcm16[i] / 0x7FFF;
            }

            const buffer = this.audioContext.createBuffer(1, float32.length, this.outSampleRate);
            buffer.copyToChannel(float32, 0);

            const source = this.audioContext.createBufferSource();
            source.buffer = buffer;
            source.connect(this.audioContext.destination);
            source.start();
        } catch (e) {
            console.error('Error playing audio chunk:', e);
        }
    }
}
