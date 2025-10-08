import { Button } from "@/components/ui/button";
import { useMidiPlayer } from "@/hooks/use-midi-player";
import { Pause, Play, Upload } from "lucide-react";
import { useRef, useState } from "react";

type Props = {
  onChange: (imgUrl: File) => void;
};

const UploadMidiFile: React.FC<Props> = ({ onChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    midiFile,
    isPlaying,
    trackName,
    loadMidiFile,
    togglePlayPause,
    reset,
  } = useMidiPlayer();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.name.endsWith(".mid") || file.name.endsWith(".midi"))) {
      loadMidiFile(file);
      onChange(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith(".mid") || file.name.endsWith(".midi"))) {
      loadMidiFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full max-w-4xl">
      {!midiFile ? (
        <div className="space-y-4">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg mb-2 text-foreground">
              Drop your MIDI file here
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              or click the button below to browse
            </p>
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Choose File
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".mid,.midi"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-start py-2">
              <h2 className="text-xl font-bold text-foreground mb-2 text-balance">
                {trackName}
              </h2>
              <p className="text-muted-foreground text-sm">{midiFile.name}</p>
            </div>

            <Button
              type="button"
              size="icon"
              onClick={togglePlayPause}
              className="w-16 h-16 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" fill="currentColor" />
              ) : (
                <Play className="w-8 h-8" fill="currentColor" />
              )}
            </Button>
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              onClick={reset}
              className="text-foreground bg-transparent"
            >
              Load Different File
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default UploadMidiFile;
