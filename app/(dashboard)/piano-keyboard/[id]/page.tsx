"use client";
import { useCategory, useLessonsByCategory } from "@/hooks/usePianoQuery";
import { Params } from "@/types/params";
import { use } from "react";
import AddSongPopup from "../components/add-song-popup";
import PlaylistTable from "../components/playlist-table";
import { columnsLessons } from "../components/columns/lesson-column";

type Props = {
  params: Params<{ id: string }>;
};

const PianoKeyboardPage = ({ params }: Props) => {
  const { id } = use(params);
  const { data: lessons, isPending } = useLessonsByCategory(id);
  const { data: category } = useCategory(id);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="sticky top-0 bg-white z-10 w-full flex items-center justify-between py-4  border-b">
        <h1 className="text-2xl font-bold">{category?.name}</h1>
        <AddSongPopup categoryId={id} />
      </div>
      <PlaylistTable
        data={lessons || []}
        columns={columnsLessons}
        filterBy="name"
        placeholderFilter="Search by name..."
      />
    </>
  );
};

export default PianoKeyboardPage;
