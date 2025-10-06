import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteLesson } from "@/hooks/usePianoQuery";
import { Loader, Trash2 } from "lucide-react";
import { toast } from "sonner";

type Props = {
  id: string;
};

const DeleteLesson: React.FC<Props> = ({ id }) => {
  const { mutate: deleteLesson, isPending } = useDeleteLesson();

  const handleDelete = () => {
    deleteLesson(id, {
      onSuccess() {
        toast.success("Lesson deleted successfully");
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex justify-start" variant={"destructive"}>
          <Trash2 />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Button
            variant={"destructive"}
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? <Loader className="animate-spin" /> : <Trash2 />}
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteLesson;
