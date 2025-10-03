import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateCategory } from "@/hooks/usePianoQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

type Props = {
  id: string;
  name: string;
};

const EditPlaylistPopup: React.FC<Props> = ({ id, name }) => {
  const { mutate: editCategory, isPending } = useUpdateCategory();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    editCategory(
      { id, name: data.name },
      {
        onSuccess: () => {
          toast.success("Edit playlist successfully");
          form.reset();
        },
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="justify-start" variant={"ghost"} size={"sm"}>
          <Pencil className="mr-2" size={16} />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Playlist</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Update playlist</FormLabel>
                  <FormControl>
                    <Input placeholder="Name playlist" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {isPending && <Loader className="animate-spin mr-2" />}
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default EditPlaylistPopup;
