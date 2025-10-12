"use client";
import { PianoCategory } from "@/types/piano";
import { Copy, Ellipsis, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ConfirmDeletePlaylistPopup from "./confirm-delete-playlist-popup";
import { useCreateCategory } from "@/hooks/usePianoQuery";
import EditPlaylistPopup from "./edit-playlist-popup";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  category: PianoCategory;
};

const PlaylistNameCard: React.FC<Props> = ({ category }) => {
  const { mutate: createCategory, isPending } = useCreateCategory();
  const pathName = usePathname().split("/");
  const router = useRouter();

  const handleDuplicate = () => createCategory(category.name + " Copy");
  const onRedirect = () => router.push(`/piano-keyboard/${category.id}`);

  const handleOpenModal = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      onClick={onRedirect}
      className={cn(
        "py-4 px-4 cursor-pointer",
        pathName.includes(category.id) ? "bg-primary/50" : ""
      )}
    >
      <div className="flex items-center justify-between relative">
        <div>
          <p className="font-medium">{category.name}</p>
          <span>{category.country}</span>
        </div>
        <Popover>
          <PopoverTrigger className="absolute -right-2" asChild onClick={handleOpenModal}>
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
