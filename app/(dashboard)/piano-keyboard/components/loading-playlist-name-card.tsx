import { Skeleton } from "@/components/ui/skeleton";

const LoadingPianoKeyboardPage = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="w-full h-[86px]" />
      ))}
    </>
  );
};
export default LoadingPianoKeyboardPage;
