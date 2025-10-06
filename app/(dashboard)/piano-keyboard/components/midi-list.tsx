import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetListMidi } from "@/hooks/usePianoQuery";
import { cn, mergeLinkThumbnail } from "@/lib/utils";
import Image from "next/image";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const MidiList: React.FC<Props> = ({ onChange, value }) => {
  const { data: midis } = useGetListMidi();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>choose from server</Button>
      </PopoverTrigger>
      <PopoverContent className="p-1">
        <div className="flex flex-wrap justify-between gap-1">
          {midis?.map((item, i) => (
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
export default MidiList;
