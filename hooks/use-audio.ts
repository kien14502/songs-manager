// hooks/useAudio.ts

import { useRef, useCallback, RefObject } from "react";

/**
 * Custom hook to manage a browser Audio element for playback.
 * * @returns {Object} An object containing the audio reference and a function to load a new file.
 */
const useAudio = () => {
  // 1. Create a ref to hold the HTMLAudioElement instance
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 2. Create the audio element on first render (if not already done)
  if (audioRef.current === null && typeof window !== "undefined") {
    audioRef.current = new Audio();
  }

  // 3. The core function to load audio from a file input
  const loadAudio = useCallback(
    (inputRef: RefObject<HTMLInputElement | null>) => {
      const file = inputRef.current?.files?.[0];
      console.log(file);

      // Check if a file was selected
      if (!file) {
        console.warn("No file selected.");
        return;
      }

      // Revoke previous URL to free up memory (good practice)
      if (audioRef.current?.src) {
        URL.revokeObjectURL(audioRef.current.src);
      }

      // Create a new URL for the selected file
      const urlFile = URL.createObjectURL(file);

      // Assign the new URL, load, and prepare for playback
      if (audioRef.current) {
        audioRef.current.src = urlFile;
        audioRef.current.load();
        // Optional: Log success
        console.log(`Audio loaded: ${file.name}`);
      }
    },
    []
  ); // Dependency array is empty as loadAudio doesn't rely on outside state/props
  const play = () => {
    if (!audioRef.current) return;
    audioRef.current?.play();
    console.log("test", audioRef.current);
  };
  // 4. Expose useful functions/references
  return {
    audioRef: audioRef.current, // Pass the actual element instance
    loadAudio,
    // You can also add play/pause wrappers here for convenience
    play,
    pause: () => audioRef.current?.pause(),
  };
};
export default useAudio;
