"use client";
import { PianoCategory } from "@/types/piano";
import { Copy, Ellipsis, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ConfirmDeletePlaylistPopup from "./confirm-delete-playlist-popup";
import { useCreateCategory } from "@/hooks/usePianoQuery";
import EditPlaylistPopup from "./edit-playlist-popup";
import Link from "next/link";

type Props = {
  category: PianoCategory;
};

const PlaylistNameCard: React.FC<Props> = ({ category }) => {
  const { mutate: createCategory, isPending } = useCreateCategory();

  const handleDuplicate = () => createCategory(category.name + " Copy");

  return (
    <div className="py-4 px-2 hover:bg-secondary">
      <div className="flex items-center justify-between">
        <Link href={`/piano-keyboard/${category.id}`}>
          <span className="font-semibold">{category.name}</span>
        </Link>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <Ellipsis className="rotate-90" size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-2 max-w-[150px] p-2  font-medium">
            <EditPlaylistPopup id={category.id} name={category.name} />
            <Button
              disabled={isPending}
              onClick={handleDuplicate}
              className="justify-start"
              variant={"ghost"}
              size={"sm"}
            >
              {isPending ? (
                <Loader className="animate-spin" />
              ) : (
                <Copy className="mr-2" size={16} />
              )}
              Duplicate
            </Button>
            <ConfirmDeletePlaylistPopup id={category.id} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
export default PlaylistNameCard;
