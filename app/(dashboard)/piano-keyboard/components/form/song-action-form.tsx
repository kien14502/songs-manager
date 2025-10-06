import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AddSongFormData, addSongSchema } from "@/types/add-song";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputForm from "./intut-form";
import DropdownForm from "./dropdown-form";
import { starOptions } from "@/constants/common";
import { PropsWithChildren } from "react";
import ThumbnailList from "../thumnail-list";
import UploadThumbnail from "../upload-thumbnail";

type Props = {
  mode: "add" | "edit";
  onSubmit: (data: AddSongFormData) => void;
  initialData?: AddSongFormData;
};

const SongActionForm: React.FC<Props> = ({ mode, onSubmit, initialData }) => {
  const form = useForm<AddSongFormData>({
    resolver: zodResolver(addSongSchema),
    defaultValues: {
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

  const handleSubmit123 = (data: AddSongFormData) => {
    console.log("data", data);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleSubmit123)}
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
        <UploadThumbnail />
        <div className="flex items-end gap-2">
          <InputForm
            type="file"
            control={form.control}
            name={"thumbnail"}
            label={"Thumbnail"}
            placeholder={"Enter thumbnail"}
          />
          <ThumbnailList
            value={form.watch("thumbnail")}
            onChange={(value) => form.setValue("thumbnail", value)}
          />
        </div>
        <div className="flex items-end gap-2">
          <InputForm
            type="file"
            control={form.control}
            name={"midiFile"}
            label={"Midi File"}
            placeholder={"Enter Midi File"}
          />
          {/* <MidiList
            value={form.watch("midiFile")}
            onChange={(value) => form.setValue("midiFile", value)}
          /> */}
        </div>

        <Button type="submit">{mode}</Button>
      </form>
    </Form>
  );
};
export default SongActionForm;

const FormWrapper = ({ children }: PropsWithChildren) => {
  return <div className="grid grid-cols-2 gap-2">{children}</div>;
};
