import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, X, Play, Square, Volume2, MessageSquare } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useLanguage } from '../../lib/LanguageContext';

// Mock Service
const VoiceAgentService = {
  status: 'idle',
  transcript: [] as { role: 'user' | 'agent'; text: string }[],
  
  async startSession() {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  },
  
  async stopSession() {
    return new Promise((resolve) => setTimeout(resolve, 500));
  }
};

export const VoiceAgent = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);
  const [status, setStatus] = React.useState<'idle' | 'listening' | 'speaking'>('idle');
  const [transcript, setTranscript] = React.useState(VoiceAgentService.transcript);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript]);

  const toggleSession = async () => {
    if (status === 'idle') {
      setStatus('listening');
      // Mock interaction
      setTimeout(() => {
        setTranscript(prev => [...prev, { role: 'user', text: 'Hello, I want to learn more about your services.' }]);
        setTimeout(() => {
          setStatus('speaking');
          setTranscript(prev => [...prev, { role: 'agent', text: 'Hello! I am Clariona AI. I can help you with website building, GMB ranking, or AI voice agents. Which one interests you most?' }]);
          setTimeout(() => setStatus('listening'), 3000);
        }, 1000);
      }, 2000);
    } else {
      setStatus('idle');
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 flex items-center gap-3 bg-brand-heading text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-brand-blue/20 transition-all border border-white/10"
      >
        <div className="relative">
          <Mic size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-blue rounded-full animate-pulse" />
        </div>
        <span className="font-semibold">{t('voiceAgent.button')}</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-brand-heading/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col h-[600px]"
            >
              {/* Header */}
              <div className="p-6 border-b border-brand-blue/10 flex items-center justify-between bg-brand-bg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-heading flex items-center justify-center text-white shadow-lg">
                    <Mic size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-heading">{t('voiceAgent.modalTitle')}</h3>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "w-2 h-2 rounded-full",
                        status === 'idle' ? "bg-gray-400" : "bg-emerald-500 animate-pulse"
                      )} />
                      <span className="text-xs font-medium text-brand-body uppercase tracking-wider">
                        {t(`voiceAgent.status.${status}`)}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white rounded-full transition-colors text-brand-body"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Transcript */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-4 bg-brand-bg/30"
              >
                {transcript.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                    <MessageSquare size={48} className="mb-4 text-brand-blue" />
                    <p className="text-sm">{t('voiceAgent.idleDesc')}</p>
                  </div>
                ) : (
                  transcript.map((msg, i) => (
                    <motion.div
                      initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={i}
                      className={cn(
                        "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed",
                        msg.role === 'user' 
                          ? "ml-auto bg-brand-blue text-white rounded-tr-none" 
                          : "bg-white border border-brand-blue/10 text-brand-body rounded-tl-none shadow-sm"
                      )}
                    >
                      {msg.text}
                    </motion.div>
                  ))
                )}
              </div>

              {/* Visualization & Controls */}
              <div className="p-8 border-t border-brand-blue/10 bg-white">
                <div className="flex flex-col items-center gap-8">
                  {/* Volume Visualization */}
                  <div className="flex items-end gap-1 h-12">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          height: status !== 'idle' ? [10, Math.random() * 40 + 10, 10] : 4
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 0.5, 
                          delay: i * 0.05 
                        }}
                        className={cn(
                          "w-1.5 rounded-full transition-colors",
                          status === 'speaking' ? "bg-brand-orange" : 
                          status === 'listening' ? "bg-brand-blue" : "bg-gray-200"
                        )}
                      />
                    ))}
                  </div>

                  <button
                    onClick={toggleSession}
                    className={cn(
                      "w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-xl active:scale-90",
                      status === 'idle' 
                        ? "bg-brand-blue text-white hover:bg-brand-blue/90" 
                        : "bg-red-500 text-white hover:bg-red-600"
                    )}
                  >
                    {status === 'idle' ? <Play size={32} fill="currentColor" /> : <Square size={32} fill="currentColor" />}
                  </button>

                  <p className="text-xs text-brand-body font-medium flex items-center gap-2">
                    <Volume2 size={14} />
                    {t('voiceAgent.poweredBy')}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
