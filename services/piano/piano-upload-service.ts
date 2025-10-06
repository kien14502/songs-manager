import axiosInstance from "@/config/axios";
import { Thumbnail } from "@/types/piano";

const getListThumbnail = async (): Promise<Thumbnail[]> => {
  const res = await axiosInstance.get("/thumbnails/list");
  return res.data;
};

const uploadThumbnail = async (thumbnail: File) => {
  const res = await axiosInstance.post("/thumbnails/list", {
    thumbnail,
  });
  return res.data;
};

const getListMidi = async (): Promise<Thumbnail[]> => {
  const res = await axiosInstance.get("/midi/list");
  return res.data ?? [];
};
const uploadMidiFile = async (midi: File) => {
  const res = await axiosInstance.post("/upload/midi", { midi });
  return res.data;
};

export { getListThumbnail, uploadThumbnail, getListMidi, uploadMidiFile };
