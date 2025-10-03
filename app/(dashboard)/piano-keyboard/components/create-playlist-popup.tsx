"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateCategory } from "@/hooks/usePianoQuery";
import { Loader, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

const CreatePlaylistPopup = () => {
  const [isOpenCreatePlaylistPopup, setIsOpenCreatePlaylistPopup] =
    useState(false);
  const { mutate: createCategory, isPending } = useCreateCategory();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) =>
    createCategory(data.name, {
      onSuccess: () => {
        toast.success("Create playlist successfully");
        setIsOpenCreatePlaylistPopup(false);
        form.reset();
      },
    });

  return (
    <Dialog
      open={isOpenCreatePlaylistPopup}
      onOpenChange={setIsOpenCreatePlaylistPopup}
    >
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <Plus size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Playlist</DialogTitle>
          <DialogDescription>
            Please enter the name of your new playlist.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name playlist</FormLabel>
                  <FormControl>
                    <Input placeholder="Name playlist" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader className="animate-spin mr-2" />}
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default CreatePlaylistPopup;
