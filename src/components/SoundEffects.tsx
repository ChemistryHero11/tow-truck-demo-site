"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playClick: () => void;
  playHover: () => void;
  playSuccess: () => void;
}

const SoundContext = createContext<SoundContextType>({
  isMuted: true,
  toggleMute: () => {},
  playClick: () => {},
  playHover: () => {},
  playSuccess: () => {},
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(true);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    const ctx = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    setAudioContext(ctx);
    return () => {
      ctx.close();
    };
  }, []);

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = "sine") => {
    if (isMuted || !audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  }, [isMuted, audioContext]);

  const playClick = useCallback(() => {
    playTone(800, 0.05, "square");
  }, [playTone]);

  const playHover = useCallback(() => {
    playTone(600, 0.03, "sine");
  }, [playTone]);

  const playSuccess = useCallback(() => {
    if (isMuted || !audioContext) return;
    playTone(523, 0.1, "sine");
    setTimeout(() => playTone(659, 0.1, "sine"), 100);
    setTimeout(() => playTone(784, 0.15, "sine"), 200);
  }, [isMuted, audioContext, playTone]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioContext?.state === "suspended") {
      audioContext.resume();
    }
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playClick, playHover, playSuccess }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}

export default function SoundToggle() {
  const { isMuted, toggleMute } = useSound();

  return (
    <motion.button
      onClick={toggleMute}
      className="p-2 rounded-full hover:bg-white/10 transition-colors"
      whileTap={{ scale: 0.9 }}
      aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-white/50" />
      ) : (
        <Volume2 className="w-5 h-5 text-safety-orange" />
      )}
    </motion.button>
  );
}
