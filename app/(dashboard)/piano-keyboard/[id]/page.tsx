"use client";

import { usePagination } from "@/hooks/use-pagination";
import { useLessonsByCategory } from "@/hooks/usePianoQuery";
import { Params } from "@/types/params";
import { PianoLesson } from "@/types/piano";
import { use } from "react";

type Props = {
  params: Params<{ id: string }>;
};

const PianoKeyboardPage = ({ params }: Props) => {
  const { id } = use(params);
  const { data: lessons, isPending } = useLessonsByCategory(id);
  const { currentData, page, totalPages, nextPage, prevPage, setPage } =
    usePagination<PianoLesson>(lessons || [], 5);
  console.log(currentData);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return <div>{currentData.map((lesson) => lesson.name).join(", ")}</div>;
};

export default PianoKeyboardPage;
