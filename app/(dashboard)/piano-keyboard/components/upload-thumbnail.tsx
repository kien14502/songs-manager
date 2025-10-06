import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetListThumbnail, useUploadThumbnail } from "@/hooks/usePianoQuery";
import { cn, mergeLinkThumbnail } from "@/lib/utils";
import { CircleX, ImageUp, Loader } from "lucide-react";
import Image from "next/image";
import { useState, DragEvent, useMemo, useRef } from "react";

const UploadThumbnail = () => {
  const { data: thumbnails } = useGetListThumbnail();
  const { mutate: uploadThumbnail, isPending } = useUploadThumbnail();
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileName, setFileName] = useState<File | null | string>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setFileName(file);
    }
  };

  const dropzoneClasses = useMemo(() => {
    return [
      "flex flex-col items-center justify-center w-full h-40 rounded-2xl transition-colors duration-200",
      "border-2 border-dashed",
      isDragOver
        ? "border-primary bg-primary/10 text-primary-foreground" // Màu khi kéo qua
        : "border-muted-foreground/50 hover:border-primary/70", // Màu mặc định
    ].join(" ");
  }, [isDragOver]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFileName(file);
    }
  };
  const handleOpenChangeFile = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const imageUrl = useMemo(() => {
    let rs: string;
    if (typeof fileName === "string") {
      rs = mergeLinkThumbnail(fileName);
    } else if (fileName instanceof File) {
      rs = URL.createObjectURL(fileName);
    } else {
      rs = "";
    }
    return rs;
  }, [fileName]);

  const handleRemoveFile = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setFileName(null);
  };

  const handleUpload = () => {
    if (!fileName) return;
    if (typeof fileName === "string") {
    } else {
      uploadThumbnail(fileName, {
        onSuccess(data) {},
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mr-auto">
          <ImageUp />
          Upload Thumbnail
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Thumbnail</DialogTitle>
        </DialogHeader>
        {fileName && (
          <div className="relative w-fit">
            <button
              onClick={handleRemoveFile}
              className="absolute z-10 bg-white rounded-full -top-1 -right-1"
            >
              <CircleX size={16} />
            </button>
            <Image
              className="rounded-md"
              src={imageUrl}
              alt=""
              width={80}
              height={80}
            />
          </div>
        )}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "border border-dashed w-full h-40 rounded-2xl flex items-center gap-1",
            dropzoneClasses
          )}
        >
          Drag and drop file here
          <button
            onClick={handleOpenChangeFile}
            className="flex items-center gap-1"
          >
            <ImageUp size={20} />
            Upload image
          </button>
          <input
            ref={inputRef}
            type="file"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload-input"
            accept=""
          />
        </div>
        <div className="flex flex-wrap gap-1">
          {thumbnails?.map((item, i) => (
            <button type="button" key={i}>
              <Image
                onClick={() => setFileName(item.name)}
                className={cn("rounded-md cursor-pointer")}
                src={mergeLinkThumbnail(item.name)}
                height={50}
                width={50}
                alt={""}
              />
            </button>
          ))}
        </div>
        <Button onClick={handleUpload}>
          {isPending && <Loader className="animate-spin" />}
          Upload
        </Button>
      </DialogContent>
    </Dialog>
  );
};
export default UploadThumbnail;
