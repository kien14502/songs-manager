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
});

export type AddSongFormData = z.infer<typeof addSongSchema>;
