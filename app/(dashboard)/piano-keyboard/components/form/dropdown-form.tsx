import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, Control, FieldPath } from "react-hook-form";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  options: { title: string; value: string | boolean | number }[];
};

const DropdownForm = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
}: Props<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => {
      const selectedOption = options.find(
        (option) => option.value === field.value
      );
      return (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <DropdownMenu>
            <FormControl>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {selectedOption ? selectedOption.title : placeholder}
                </Button>
              </DropdownMenuTrigger>
            </FormControl>
            <DropdownMenuContent>
              <DropdownMenuLabel>{label}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {options.map((option, i) => (
                <DropdownMenuItem
                  key={i}
                  onSelect={() => field.onChange(option.value)}
                  className={field.value === option.value ? "bg-accent" : ""}
                >
                  {option.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <FormMessage />
        </FormItem>
      );
    }}
  />
);
export default DropdownForm;
