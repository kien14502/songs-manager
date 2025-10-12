import z from "zod";

export const addSongSchema = z.object({
  artist: z.string().min(1, { message: "Tên nghệ sĩ không được để trống." }),
  country: z.string().nonempty(),
  isFree: z.boolean(),
  midiFile: z.string().nonempty(),
  name: z.string().min(1, { message: "Tên bài hát không được để trống." }),
  scrollPosition: z.number().int(),
  star: z.number().int(),
  thumbnail: z.string().nonempty(),
  isGame: z.boolean(),
});

export type AddSongFormData = z.infer<typeof addSongSchema>;

export const categorySchema = z.object({
  name: z.string().min(2).max(50),
  country: z.string().min(2).max(50),
});

export type CategorySchema = z.infer<typeof categorySchema>;
