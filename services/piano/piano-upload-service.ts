import axiosInstance from "@/config/axios";
import { MidiFile, Thumbnail } from "@/types/piano";

const getListThumbnail = async (): Promise<Thumbnail[]> => {
  const res = await axiosInstance.get("/thumbnails/list");
  return res.data;
};

const uploadThumbnail = async (thumbnail: File) => {
  const formData = new FormData();
  formData.append("thumbnail", thumbnail);

  const res = await axiosInstance.post("/upload/thumbnail", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

const getListMidi = async (): Promise<Thumbnail[]> => {
  const res = await axiosInstance.get("/midi/list");
  return res.data ?? [];
};

const uploadMidiFile = async (midi: File): Promise<MidiFile> => {
  const formData = new FormData();
  formData.append("midi", midi);
  const res = await axiosInstance.post("/upload/midi", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

const readMidiFile = async (path: string) => {
  const res = await axiosInstance.get("/read/mid", {
    params: { path },
  });
  return res.data;
};

export {
  getListThumbnail,
  uploadThumbnail,
  getListMidi,
  uploadMidiFile,
  readMidiFile,
};
