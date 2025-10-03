"use client";
import { useCategories } from "@/hooks/usePianoQuery";
import { ListMusic } from "lucide-react";
import LoadingPianoKeyboardPage from "./components/loading-playlist-name-card";
import PlaylistNameCard from "./components/playlist-name-card";
import CreatePlaylistPopup from "./components/create-playlist-popup";
import { Suspense } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: categories, isPending } = useCategories();

  return (
    <div className="layout">
      <div className="fixed w-[240px] border shadow-sm rounded-lg h-[calc(100vh-72px)] overflow-hidden">
        <div className="flex bg-primary items-center gap-2 p-4">
          <div className="font-semibold text-lg flex-1 flex items-center gap-2">
            <ListMusic size={20} />
            PLAYLISTS
          </div>
          <CreatePlaylistPopup />
        </div>
        <div className="flex flex-col gap-1">
          {isPending && <LoadingPianoKeyboardPage />}
          {categories?.map((category) => (
            <PlaylistNameCard key={category.id} category={category} />
          ))}
        </div>
      </div>
      <div className="ml-[240px] px-2">
        <Suspense fallback={<div>loading....</div>}>{children}</Suspense>
      </div>
    </div>
  );
};
export default Layout;
