import axiosInstance from "@/config/axios";
import { CreateSongPayload, PianoLesson } from "@/types/piano";

// GET /lessons → Lấy tất cả lessons
export const getAllLessons = async (): Promise<PianoLesson[]> => {
  const response = await axiosInstance.get("/lessons");
  return response.data;
};

// POST /lessons → Tạo lesson mới
export const createLesson = async (
  lesson: CreateSongPayload
): Promise<PianoLesson> => {
  const response = await axiosInstance.post("/lessons", lesson);
  return response.data;
};

// GET /lessons/category/{categoryId} → Lấy danh sách lessons theo category
export const getLessonsByCategory = async (
  categoryId: string
): Promise<PianoLesson[]> => {
  const response = await axiosInstance.get(`/lessons/category/${categoryId}`);
  return response.data ?? [];
};

// GET /lessons/{id} → Lấy thông tin lesson
export const getLessonById = async (id: string): Promise<PianoLesson> => {
  const response = await axiosInstance.get(`/lessons/${id}`);
  return response.data;
};

// PUT /lessons/{id} → Cập nhật lesson
export const updateLesson = async (
  id: string,
  lesson: Partial<PianoLesson>
): Promise<PianoLesson> => {
  const response = await axiosInstance.put(`/lessons/${id}`, lesson);
  return response.data;
};

// DELETE /lessons/{id} → Xóa lesson
export const deleteLesson = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/lessons/${id}`);
};
