import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useDeleteCategory } from "@/hooks/usePianoQuery";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  id?: string;
};

const ConfirmDeletePlaylistPopup: React.FC<Props> = ({ id }) => {
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const { mutate: deleteCategory, isPending } = useDeleteCategory();
  const router = useRouter();

  const handleDelete = () => {
    if (!id) return;
    deleteCategory(id, {
      onSuccess: () => {
        setOpenDeletePopup(false);
        toast.success("Delete playlist successfully");
        router.replace("/piano-keyboard");
      },
    });
  };

  return (
    <>
      <Dialog open={openDeletePopup} onOpenChange={setOpenDeletePopup}>
        <DialogTrigger asChild>
          <Button className="justify-start" variant={"destructive"} size={"sm"}>
            <Trash className="mr-2" size={16} />
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure want to delete playlist?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your playlist and remove
              your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Button
              onClick={handleDelete}
              variant="destructive"
              className="mr-2"
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ConfirmDeletePlaylistPopup;
