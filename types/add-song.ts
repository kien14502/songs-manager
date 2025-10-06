import z from "zod";

export const addSongSchema = z.object({
  artist: z.string().min(1, { message: "Tên nghệ sĩ không được để trống." }),
  country: z.string().nonempty(),
  isFree: z.boolean(),
  midiFile: z.string().url().or(z.string().startsWith("/uploads/midi/")),
  name: z.string().min(1, { message: "Tên bài hát không được để trống." }),
  scrollPosition: z.number().int(),
  star: z.number().int(),
  thumbnail: z.string().url({ message: "Thumbnail phải là một URL hợp lệ." }),
});

export type AddSongFormData = z.infer<typeof addSongSchema>;
