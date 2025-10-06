import { API_URL } from "@/config/env";
import { PianoLesson } from "@/types/piano";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  ArrowDownUpIcon,
  EllipsisVerticalIcon,
  EyeOffIcon,
} from "lucide-react";
import DeleteLesson from "../delete-lesson";

export const columnsLessons: ColumnDef<PianoLesson>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell({ row, getValue }) {
      const imgUrl = API_URL + row.original.thumbnail;
      return (
        <div className="flex items-center gap-2">
          <Image src={imgUrl} width={50} height={50} alt={""} />
          {getValue<string>()}
        </div>
      );
    },
  },
  {
    accessorKey: "artist",
    header: "Artist",
  },
  {
    accessorKey: "star",
    header: "Stars",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "isFree",
    header: "Free",
    cell({ row }) {
      return row.original.isFree ? "Yes" : "No";
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell({ row }) {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <EllipsisVerticalIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-2 max-w-[150px] p-2  font-medium">
            <Button className="flex justify-start" variant={"ghost"}>
              <ArrowDownUpIcon />
              Arrange
            </Button>
            <Button className="flex justify-start" variant={"ghost"}>
              <EyeOffIcon />
              Hide
            </Button>
            <DeleteLesson id={row.original.id} />
          </PopoverContent>
        </Popover>
      );
    },
  },
];
