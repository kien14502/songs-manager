import axiosInstance from "@/config/axios";
import { PianoCategory } from "@/types/piano";

// GET /categories → Lấy tất cả categories
export const getAllCategories = async (): Promise<PianoCategory[]> => {
  const response = await axiosInstance.get("/categories");
  return response.data;
};

// POST /categories → Tạo category mới
export const createCategory = async (name: string): Promise<PianoCategory> => {
  const response = await axiosInstance.post("/categories", { name });
  return response.data;
};

// GET /categories/{id} → Lấy thông tin category theo ID
export const getCategoryById = async (id: string): Promise<PianoCategory> => {
  const response = await axiosInstance.get(`/categories/${id}`);
  return response.data;
};

// PUT /categories/{id} → Cập nhật category
export const updateCategory = async (
  id: string,
  name: string
): Promise<PianoCategory> => {
  const response = await axiosInstance.put(`/categories/${id}`, { name });
  return response.data;
};

// DELETE /categories/{id} → Xóa category
export const deleteCategory = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/categories/${id}`);
};
