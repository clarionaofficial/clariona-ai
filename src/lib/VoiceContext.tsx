import React, { createContext, useContext, useState, ReactNode } from 'react';

type VoiceStatus = 'idle' | 'listening' | 'speaking';

interface VoiceContextType {
    isAgentOpen: boolean;
    setIsAgentOpen: (open: boolean) => void;
    status: VoiceStatus;
    setStatus: (status: VoiceStatus) => void;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const VoiceProvider = ({ children }: { children: ReactNode }) => {
    const [isAgentOpen, setIsAgentOpen] = useState(false);
    const [status, setStatus] = useState<VoiceStatus>('idle');

    return (
        <VoiceContext.Provider value={{ isAgentOpen, setIsAgentOpen, status, setStatus }}>
            {children}
        </VoiceContext.Provider>
    );
};

export const useVoice = () => {
    const context = useContext(VoiceContext);
    if (!context) {
        throw new Error('useVoice must be used within a VoiceProvider');
    }
    return context;
};
