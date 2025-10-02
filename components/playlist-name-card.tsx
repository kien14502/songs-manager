import { PianoCategory } from "@/types/piano";
import { Ellipsis } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  category: PianoCategory;
};

const PlaylistNameCard: React.FC<Props> = ({ category }) => {
  return (
    <div className="border p-4 pb-8 rounded-2xl shadow">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-xl">{category.name}</span>
        <Button variant={"ghost"} size={"icon"}>
          <Ellipsis className="rotate-90" size={20} />
        </Button>
      </div>
    </div>
  );
};
export default PlaylistNameCard;
// href={`/piano-keyboard/${category.id}`}
