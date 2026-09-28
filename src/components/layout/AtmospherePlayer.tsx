'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Moon, Sun } from 'lucide-react';

export default function AtmospherePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDuskMode, setIsDuskMode] = useState(false);

  // Web Audio Context for pure synthesizer gentle vinyl cafe warmth
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);

  // Safe cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const toggleSound = () => {
    if (isPlaying) {
      // Stop audio
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.5);
        setTimeout(() => {
          osc1Ref.current?.stop();
          osc2Ref.current?.stop();
          audioCtxRef.current?.close();
          audioCtxRef.current = null;
        }, 600);
      }
      setIsPlaying(false);
    } else {
      // Start soothing ambient harmonic chords (F# major chord at soft 432Hz warmth)
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1.5);
        gainNode.connect(ctx.destination);
        gainNodeRef.current = gainNode;

        // Warm fundamental note (F# 185Hz)
        const osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(185.0, ctx.currentTime);
        osc1.connect(gainNode);
        osc1.start();
        osc1Ref.current = osc1;

        // Warm 5th harmonic (C# 277.18Hz)
        const osc2 = ctx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(277.18, ctx.currentTime);
        osc2.connect(gainNode);
        osc2.start();
        osc2Ref.current = osc2;

        setIsPlaying(true);
      } catch {
        // Audio policy or unsupported
        setIsPlaying(false);
      }
    }
  };

  const toggleDusk = () => {
    setIsDuskMode(!isDuskMode);
    document.documentElement.classList.toggle('dusk-atmosphere-active');
  };

  return (
    <div className="flex items-center gap-2 text-xs">
      {/* Dusk / Day Mood Toggle */}
      <button
        onClick={toggleDusk}
        className={`px-2.5 py-1 rounded-full border transition-all flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase ${
          isDuskMode
            ? 'bg-[#C48B56] text-[#1A1412] border-[#C48B56]'
            : 'bg-white/10 hover:bg-white/20 text-[#D4C9BC] border-white/20'
        }`}
        title="Toggle Dusk Ambient Lighting Mode"
      >
        {isDuskMode ? <Moon size={11} /> : <Sun size={11} />}
        <span>{isDuskMode ? 'DUSK JAZZ' : 'DAYLIGHT'}</span>
      </button>

      {/* Gentle Café Acoustic Soundscape */}
      <button
        onClick={toggleSound}
        className={`px-2.5 py-1 rounded-full border transition-all flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase ${
          isPlaying
            ? 'bg-[#3E6B48] text-white border-[#3E6B48] shadow-sm'
            : 'bg-white/10 hover:bg-white/20 text-[#D4C9BC] border-white/20'
        }`}
        title="Play/Pause Café Acoustic Ambiance"
      >
        {isPlaying ? <Volume2 size={11} className="animate-pulse text-[#C48B56]" /> : <VolumeX size={11} />}
        <span>{isPlaying ? 'ACOUSTIC ♫' : 'PLAY AMBIANCE'}</span>
      </button>
    </div>
  );
}
