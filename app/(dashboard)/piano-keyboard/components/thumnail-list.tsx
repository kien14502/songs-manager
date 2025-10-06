import { useGetListThumbnail } from "@/hooks/usePianoQuery";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn, mergeLinkThumbnail } from "@/lib/utils";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const ThumbnailList: React.FC<Props> = ({ onChange, value }) => {
  const { data: thumbnails } = useGetListThumbnail();
  console.log(value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Select from server</Button>
      </PopoverTrigger>
      <PopoverContent className="p-1">
        <div className="flex flex-wrap justify-between gap-1">
          {thumbnails?.map((item, i) => (
            <button type="button" onClick={() => onChange(item.name)} key={i}>
              <Image
                className={cn(
                  "rounded-md cursor-pointer",
                  value === item.name && "border-2 border-blue-400"
                )}
                src={mergeLinkThumbnail(item.name)}
                height={50}
                width={50}
                alt={""}
              />
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default ThumbnailList;
