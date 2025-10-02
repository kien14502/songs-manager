"use client";
import PlaylistNameCard from "@/components/playlist-name-card";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/hooks/usePianoQuery";

const PianoKeyboardPage = () => {
  const { data: categories } = useCategories();
  console.log(categories);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>Playlist</div>
        <Button>Create new</Button>
      </div>
      <div className="flex flex-col gap-4">
        {categories?.map((category) => (
          <PlaylistNameCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};
export default PianoKeyboardPage;
