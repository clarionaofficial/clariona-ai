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

    private nextStartTime = 0;
    private isPlaying = false;

    async startRecording(onAudioData: (base64: string) => void) {
        try {
            if (!this.audioContext || this.audioContext.state === 'closed') {
                this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: this.sampleRate });
            }
            await this.audioContext.resume();

            this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.source = this.audioContext.createMediaStreamSource(this.mediaStream);

            this.processor = this.audioContext.createScriptProcessor(512, 1, 1);

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

        this.processor = null;
        this.source = null;
        this.mediaStream = null;
        console.log('Recording stopped');
    }

    async playAudio(base64Data: string) {
        if (!this.audioContext || this.audioContext.state === 'closed') {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: this.outSampleRate });
        }

        if (this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
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

            const currentTime = this.audioContext.currentTime;
            if (this.nextStartTime < currentTime) {
                this.nextStartTime = currentTime + 0.05; // Small buffer for initial chunk
            }

            source.start(this.nextStartTime);
            this.nextStartTime += buffer.duration;
            this.isPlaying = true;
        } catch (e) {
            console.error('Error playing audio chunk:', e);
        }
    }
}
