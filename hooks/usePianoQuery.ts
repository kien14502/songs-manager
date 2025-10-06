import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/services/piano/piano-categories-service";
import {
  createLesson,
  deleteLesson,
  getAllLessons,
  getLessonById,
  getLessonsByCategory,
  updateLesson,
} from "@/services/piano/piano-lessons-service";
import {
  getListMidi,
  getListThumbnail,
  uploadMidiFile,
  uploadThumbnail,
} from "@/services/piano/piano-upload-service";
import { PianoCategory, PianoLesson } from "@/types/piano";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

export const useCategories = () =>
  useQuery<PianoCategory[]>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

export const useCategory = (id: string) =>
  useQuery<PianoCategory>({
    queryKey: ["categories", id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  });

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateCategory(id, name),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["categories", variables.id] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useLessons = () =>
  useQuery<PianoLesson[]>({
    queryKey: ["lessons"],
    queryFn: getAllLessons,
  });

export const useLessonsByCategory = (categoryId: string) =>
  useQuery<PianoLesson[]>({
    queryKey: ["lessons", "category", categoryId],
    queryFn: () => getLessonsByCategory(categoryId),
    enabled: !!categoryId,
  });

export const useLesson = (id: string) =>
  useQuery<PianoLesson>({
    queryKey: ["lessons", id],
    queryFn: () => getLessonById(id),
    enabled: !!id,
  });

export const useCreateLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
    },
  });
};

export const useUpdateLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      lesson,
    }: {
      id: string;
      lesson: Partial<PianoLesson>;
    }) => updateLesson(id, lesson),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
      queryClient.invalidateQueries({ queryKey: ["lessons", variables.id] });
    },
  });
};

export const useDeleteLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
    },
  });
};

export const useGetListThumbnail = () => {
  return useQuery({
    queryKey: ["thumbnails"],
    queryFn: getListThumbnail,
    staleTime: 1000 * 60 * 5, // cache time :5p
  });
};

export const useUploadThumbnail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadThumbnail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["thumbnails"] });
    },
  });
};

export const useGetListMidi = () => {
  return useQuery({
    queryKey: ["midis"],
    queryFn: getListMidi,
    staleTime: 1000 * 60 * 5, // cache time :5p
  });
};
export const useUploadMidi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadMidiFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["midis"] });
    },
  });
};
