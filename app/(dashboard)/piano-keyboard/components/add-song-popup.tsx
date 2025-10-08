import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import SongActionForm from "./form/song-action-form";
import { AddSongFormData } from "@/types/add-song";
import { useCreateLesson } from "@/hooks/usePianoQuery";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  categoryId: string;
};

const AddSongPopup: React.FC<Props> = ({ categoryId }) => {
  const { mutate: createLesson, isPending } = useCreateLesson();
  const [openModal, setOpenModal] = useState(false);

  const onSubmit = (payload: AddSongFormData) => {
    const rs = { categoryId, ...payload };
    createLesson(rs, {
      onSuccess() {
        toast("Create lesson successfull");
        setOpenModal(false);
      },
    });
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Plus />
          Add song
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new song</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Fill in the details for the new song.
        </DialogDescription>
        <SongActionForm
          mode={"add"}
          onSubmit={onSubmit}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddSongPopup;
