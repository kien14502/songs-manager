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

const AddSongPopup = () => {
  const onSubmit = (data: AddSongFormData) => {
    console.log(data);
  };

  return (
    <Dialog>
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
        <SongActionForm mode={"add"} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddSongPopup;
