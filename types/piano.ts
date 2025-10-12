export interface PianoCategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  country: string;
}

export interface PianoLesson {
  id: string;
  categoryId: string;
  name: string;
  artist: string;
  thumbnail: string;
  midiFile: string;
  star: number;
  view: number;
  like: number;
  isFree: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  scrollPosition: number;
  country: string;
}
export interface CreateSongPayload {
  artist: string;
  categoryId: string;
  country: string;
  isFree: boolean;
  midiFile: string;
  name: string;
  scrollPosition: number;
  star: number;
  thumbnail: string;
}

export interface Thumbnail {
  name: string;
}

export interface MidiFile {
  filePath: string;
  message: string;
}
