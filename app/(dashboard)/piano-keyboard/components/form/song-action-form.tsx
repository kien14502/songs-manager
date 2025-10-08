import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AddSongFormData, addSongSchema } from "@/types/add-song";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputForm from "./intut-form";
import DropdownForm from "./dropdown-form";
import { starOptions } from "@/constants/common";
import { PropsWithChildren } from "react";
import UploadThumbnail from "../upload-thumbnail";
import UploadMidiFile from "../upload-midi-file";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useUploadMidi } from "@/hooks/usePianoQuery";
import { Loader } from "lucide-react";
import { API_URL } from "@/config/env";

type Props = {
  mode: "add" | "edit";
  onSubmit: (data: AddSongFormData) => void;
  initialData?: AddSongFormData;
  isPending: boolean;
};

const SongActionForm: React.FC<Props> = ({
  mode,
  onSubmit,
  initialData,
  isPending,
}) => {
  const { mutate: uploadMidiFile } = useUploadMidi();
  const form = useForm<AddSongFormData>({
    resolver: zodResolver(addSongSchema),
    defaultValues: initialData ?? {
      artist: "",
      country: "",
      isFree: false,
      midiFile: "",
      name: "",
      scrollPosition: 1,
      star: 1,
      thumbnail: "",
    },
  });

  const handleOnChangeThumbnail = (imgUrl: string) => {
    form.setValue("thumbnail", "uploads/thumbnails/" + imgUrl);
  };

  const handleOnChangeMidiFile = (file: File) => {
    uploadMidiFile(file, {
      onSuccess({ filePath }) {
        form.setValue("midiFile", filePath);
      },
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormWrapper>
          <InputForm
            control={form.control}
            name={"name"}
            label={"Name"}
            placeholder={"Enter name"}
          />
          <InputForm
            control={form.control}
            name={"artist"}
            label={"Artist"}
            placeholder={"Enter artist"}
          />
        </FormWrapper>
        <FormWrapper>
          <DropdownForm
            control={form.control}
            name={"star"}
            label={"Star"}
            placeholder={"Select star"}
            options={starOptions}
          />
          <DropdownForm
            control={form.control}
            name={"scrollPosition"}
            label={"Scroll Position"}
            placeholder={"Select scroll position"}
            options={starOptions}
          />
        </FormWrapper>
        <FormWrapper>
          <DropdownForm
            control={form.control}
            name={"isFree"}
            label={"Free"}
            placeholder={"Select free"}
            options={[
              { value: true, title: "Yes" },
              { value: false, title: "No" },
            ]}
          />
          <InputForm
            control={form.control}
            name={"country"}
            label={"Country"}
            placeholder={"Enter country"}
          />
        </FormWrapper>
        <div className="flex items-center justify-between">
          <UploadThumbnail onChange={handleOnChangeThumbnail} />
          {form.watch("thumbnail") && (
            <Image
              className={cn("rounded-md cursor-pointer")}
              src={API_URL + form.watch("thumbnail")}
              height={50}
              width={50}
              alt={""}
            />
          )}
        </div>
        <UploadMidiFile onChange={handleOnChangeMidiFile} />
        <Button type="submit">
          {isPending && <Loader className="animate-spin" />}
          {mode === "add" ? "Add song" : "Save"}
        </Button>
      </form>
    </Form>
  );
};
export default SongActionForm;

const FormWrapper = ({ children }: PropsWithChildren) => {
  return <div className="grid grid-cols-2 gap-2">{children}</div>;
};
