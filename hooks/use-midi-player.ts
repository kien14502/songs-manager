"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import * as Tone from "tone";
import { Midi } from "@tonejs/midi";

export interface UseMidiPlayerReturn {
  midiFile: File | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  trackName: string;
  loadMidiFile: (file: File) => Promise<void>;
  togglePlayPause: () => Promise<void>;
  skipBack: (seconds?: number) => void;
  skipForward: (seconds?: number) => void;
  seek: (time: number) => void;
  reset: () => void;
  formatTime: (seconds: number) => string;
}

export function useMidiPlayer(): UseMidiPlayerReturn {
  const [midiFile, setMidiFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [trackName, setTrackName] = useState("");

  const synthRef = useRef<Tone.PolySynth | null>(null);
  const partRef = useRef<Tone.Part | null>(null);
  const animationFrameRef = useRef<number>(null);

  useEffect(() => {
    // Initialize synth
    synthRef.current = new Tone.PolySynth(Tone.Synth).toDestination();

    return () => {
      if (synthRef.current) {
        synthRef.current.dispose();
      }
      if (partRef.current) {
        partRef.current.dispose();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const updateTime = useCallback(() => {
    if (isPlaying && Tone.Transport.state === "started") {
      setCurrentTime(Tone.Transport.seconds);
      animationFrameRef.current = requestAnimationFrame(updateTime);
    }
  }, [isPlaying]);

  const loadMidiFile = useCallback(async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const midi = new Midi(arrayBuffer);

      // Stop any existing playback
      if (partRef.current) {
        partRef.current.stop();
        partRef.current.dispose();
      }
      Tone.Transport.stop();
      Tone.Transport.position = 0;

      // Get track name
      const firstTrack = midi.tracks.find((track) => track.notes.length > 0);
      setTrackName(
        firstTrack?.name || file.name.replace(".mid", "").replace(".midi", "")
      );

      // Set duration
      setDuration(midi.duration);
      setCurrentTime(0);

      // Create notes array for all tracks
      const allNotes: Array<{
        time: number;
        note: string;
        duration: number;
        velocity: number;
      }> = [];

      midi.tracks.forEach((track) => {
        track.notes.forEach((note) => {
          allNotes.push({
            time: note.time,
            note: note.name,
            duration: note.duration,
            velocity: note.velocity,
          });
        });
      });

      // Create a new Part with all notes
      if (synthRef.current && allNotes.length > 0) {
        partRef.current = new Tone.Part((time, note) => {
          synthRef.current?.triggerAttackRelease(
            note.note,
            note.duration,
            time,
            note.velocity
          );
        }, allNotes);

        partRef.current.loop = false;

        // Set up transport end callback
        Tone.Transport.scheduleOnce(() => {
          setIsPlaying(false);
          setCurrentTime(0);
          Tone.Transport.position = 0;
        }, midi.duration);
      }

      setMidiFile(file);
    } catch (error) {
      console.error("Error loading MIDI file:", error);
    }
  }, []);

  const togglePlayPause = useCallback(async () => {
    if (!partRef.current) return;

    await Tone.start();

    if (isPlaying) {
      Tone.Transport.pause();
      setIsPlaying(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    } else {
      if (Tone.Transport.seconds >= duration) {
        Tone.Transport.position = 0;
        setCurrentTime(0);
      }

      partRef.current.start(0);
      Tone.Transport.start();
      setIsPlaying(true);
      updateTime();
    }
  }, [isPlaying, duration, updateTime]);

  const skipBack = useCallback(
    (seconds = 10) => {
      const newTime = Math.max(0, currentTime - seconds);
      Tone.Transport.seconds = newTime;
      setCurrentTime(newTime);
    },
    [currentTime]
  );

  const skipForward = useCallback(
    (seconds = 10) => {
      const newTime = Math.min(duration, currentTime + seconds);
      Tone.Transport.seconds = newTime;
      setCurrentTime(newTime);
    },
    [currentTime, duration]
  );

  const seek = useCallback((time: number) => {
    Tone.Transport.seconds = time;
    setCurrentTime(time);
  }, []);

  const reset = useCallback(() => {
    setMidiFile(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setTrackName("");
    if (partRef.current) {
      partRef.current.stop();
      partRef.current.dispose();
      partRef.current = null;
    }
    Tone.Transport.stop();
    Tone.Transport.position = 0;
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }, []);

  return {
    midiFile,
    isPlaying,
    currentTime,
    duration,
    trackName,
    loadMidiFile,
    togglePlayPause,
    skipBack,
    skipForward,
    seek,
    reset,
    formatTime,
  };
}
