export interface PianoCategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
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
