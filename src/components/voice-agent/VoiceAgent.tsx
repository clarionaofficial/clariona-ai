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
                        status === 'idle' ? "bg-emerald-500" : "bg-brand-blue animate-pulse"
                      )} />
                      <span className="text-[10px] font-bold text-brand-body uppercase tracking-wider">
                        {status === 'idle' ? t('hero.onlineNow') : t(`voiceAgent.status.${status}`)}
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

              {/* Main Visualization Area */}
              <div className="flex-1 flex flex-col items-center justify-center p-8 bg-brand-bg/20 relative overflow-hidden">
                {/* Background Glow */}
                <AnimatePresence>
                  {status !== 'idle' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: [0.1, 0.2, 0.1],
                        scale: [1, 1.1, 1],
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className={cn(
                        "absolute inset-0 blur-[80px] -z-10",
                        status === 'speaking' ? "bg-brand-orange/30" : "bg-brand-blue/30"
                      )}
                    />
                  )}
                </AnimatePresence>

                {/* Central AI Orb */}
                <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                  {/* Outer Ring */}
                  <motion.div
                    animate={{
                      scale: status === 'speaking' ? [1, 1.1, 1] : 1,
                      rotate: 360
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className={cn(
                      "absolute inset-0 border border-dashed rounded-full opacity-20",
                      status === 'speaking' ? "border-brand-orange" : "border-brand-blue"
                    )}
                  />

                  {/* The Orb */}
                  <motion.div
                    animate={{
                      scale: status === 'speaking' ? [1, 1.2, 1] : status === 'listening' ? [1, 1.05, 1] : 1,
                      boxShadow: status === 'speaking'
                        ? '0 0 40px rgba(245, 158, 11, 0.4)'
                        : status === 'listening'
                          ? '0 0 40px rgba(59, 130, 246, 0.4)'
                          : '0 0 20px rgba(59, 130, 246, 0.2)'
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={cn(
                      "w-32 h-32 rounded-full relative z-10 flex items-center justify-center overflow-hidden transition-colors duration-500",
                      status === 'speaking'
                        ? "bg-linear-to-br from-brand-orange to-brand-blue"
                        : "bg-linear-to-br from-brand-blue to-brand-orange"
                    )}
                  >
                    <div className="absolute inset-0.5 rounded-full bg-white flex items-center justify-center overflow-hidden">
                      <Mic
                        size={40}
                        className={cn(
                          "transition-colors duration-500",
                          status === 'speaking' ? "text-brand-orange" : "text-brand-blue"
                        )}
                      />

                      {/* Pulse Overlay */}
                      <AnimatePresence>
                        {status !== 'idle' && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.2, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className={cn(
                              "absolute inset-0",
                              status === 'speaking' ? "bg-brand-orange" : "bg-brand-blue"
                            )}
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>

                  {/* Volume Bars (Integrated) */}
                  <div className="absolute -bottom-4 flex items-end gap-1 h-8 px-4 py-1 bg-white/80 backdrop-blur-sm rounded-full border border-brand-blue/10 shadow-sm">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          height: status === 'speaking' ? [4, Math.random() * 16 + 4, 4] : 4
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.5,
                          delay: i * 0.04
                        }}
                        className={cn(
                          "w-1 rounded-full transition-colors",
                          status === 'speaking' ? "bg-brand-orange" : "bg-brand-blue/30"
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* Visualization block is enough, removed transcript/caption logic */}
              </div>

              {/* Controls Overlay */}
              <div className="p-8 border-t border-brand-blue/10 bg-white">
                <div className="flex flex-col items-center gap-6">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={toggleSession}
                      className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-xl active:scale-95 group/btn border-4 border-white",
                        status === 'idle'
                          ? "bg-brand-blue text-white hover:bg-brand-blue/90 shadow-brand-blue/20"
                          : "bg-red-500 text-white hover:bg-red-600 shadow-red-500/20"
                      )}
                    >
                      {status === 'idle' ? <Play size={28} fill="currentColor" className="ml-1" /> : <Square size={24} fill="currentColor" />}
                    </button>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <p className="text-[10px] text-brand-body/40 font-bold flex items-center gap-2 uppercase tracking-[0.2em]">
                      <Volume2 size={12} />
                      {t('voiceAgent.poweredBy')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
