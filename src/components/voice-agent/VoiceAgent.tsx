import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, X, Play, Square, Volume2, MessageSquare } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useLanguage } from '../../lib/LanguageContext';

import { useLiveAPI } from '../../lib/use-live-api';

import { useVoice } from '../../lib/VoiceContext';

export const VoiceAgent = () => {
  const { t } = useLanguage();
  const { isAgentOpen, setIsAgentOpen, setStatus: setGlobalStatus } = useVoice();
  const { status, transcript, startSession, stopSession } = useLiveAPI();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Sync internal status to global context
  React.useEffect(() => {
    setGlobalStatus(status);
  }, [status, setGlobalStatus]);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript]);

  const toggleSession = async () => {
    if (status === 'idle') {
      await startSession();
    } else {
      stopSession();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsAgentOpen(true)}
        className="fixed bottom-8 right-8 z-40 flex items-center gap-3 bg-brand-heading text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-brand-blue/20 transition-all border border-white/10"
      >
        <div className="relative">
          <Mic size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-blue rounded-full animate-pulse" />
        </div>
        <span className="font-semibold">{t('voiceAgent.button')}</span>
      </motion.button>

      {/* Assistant Dock */}
      <AnimatePresence>
        {isAgentOpen && (
          <div className="fixed bottom-24 right-8 z-50 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40, x: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40, x: 20 }}
              className="relative w-[380px] bg-white rounded-[24px] shadow-2xl overflow-hidden flex flex-col h-[500px] border border-brand-blue/10 pointer-events-auto"
            >
              {/* Header */}
              <div className="p-4 border-b border-brand-blue/10 flex items-center justify-between bg-brand-bg/50 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-heading flex items-center justify-center text-white shadow-lg">
                    <Mic size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-brand-heading">{t('voiceAgent.modalTitle')}</h3>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        status === 'idle' ? "bg-gray-400" : "bg-emerald-500 animate-pulse"
                      )} />
                      <span className="text-[10px] font-bold text-brand-body uppercase tracking-wider">
                        {t(`voiceAgent.status.${status}`)}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsAgentOpen(false)}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-brand-body"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Transcript */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-3 bg-brand-bg/20"
              >
                {transcript.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-40 px-8">
                    <MessageSquare size={32} className="mb-3 text-brand-blue" />
                    <p className="text-xs">{t('voiceAgent.idleDesc')}</p>
                  </div>
                ) : (
                  transcript.map((msg, i) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={i}
                      className={cn(
                        "max-w-[85%] p-3 rounded-xl text-xs leading-relaxed",
                        msg.role === 'user'
                          ? "ml-auto bg-brand-blue text-white rounded-tr-none shadow-sm"
                          : "bg-white border border-brand-blue/5 text-brand-body rounded-tl-none shadow-xs"
                      )}
                    >
                      {msg.text}
                    </motion.div>
                  ))
                )}
              </div>

              {/* Visualization & Controls */}
              <div className="p-6 border-t border-brand-blue/10 bg-white shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
                <div className="flex flex-col items-center gap-6">
                  {/* Volume Visualization */}
                  <div className="flex items-end gap-1 h-10">
                    {[...Array(15)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          height: status === 'speaking' ? [8, Math.random() * 32 + 8, 8] : 4
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.5,
                          delay: i * 0.03
                        }}
                        className={cn(
                          "w-1 rounded-full transition-colors",
                          status === 'speaking' ? "bg-brand-orange" :
                            status === 'listening' ? "bg-brand-blue" : "bg-gray-100"
                        )}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-4 w-full justify-center">
                    <button
                      onClick={toggleSession}
                      className={cn(
                        "w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-95 group/btn",
                        status === 'idle'
                          ? "bg-brand-blue text-white hover:bg-brand-blue/90"
                          : "bg-red-500 text-white hover:bg-red-600"
                      )}
                    >
                      {status === 'idle' ? <Play size={24} fill="currentColor" className="ml-1" /> : <Square size={24} fill="currentColor" />}
                    </button>
                  </div>

                  <p className="text-[10px] text-brand-body/60 font-medium flex items-center gap-1.5 uppercase tracking-widest">
                    <Volume2 size={12} />
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
