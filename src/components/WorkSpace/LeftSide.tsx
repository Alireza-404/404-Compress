import { LucideUpload } from "lucide-react";
import { useEffect, useState } from "react";

interface LeftSideProps {
  selectedFile: File | null;
  onFileSelect: (file: File) => void;
}

const MAX_SIZE = 20 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function LeftSide({
  selectedFile,
  onFileSelect,
}: LeftSideProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    if (file.size > MAX_SIZE) {
      setError("File size must be under 20 MB.");
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Only JPG, PNG and WEBP images are supported.");
      return;
    }

    setError(null);
    onFileSelect(file);
  };

  useEffect(() => {
    if (!selectedFile) return;

    const url = URL.createObjectURL(selectedFile);

    setImageUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [selectedFile]);

  return (
    <div
      className="bg-box border border-secondary/20 rounded-xl
       flex flex-col gap-y-8 p-6"
    >
      <div className="flex items-center justify-between">
        <span className="text-ec text-xs font-bold tracking-wider">
          Source image
        </span>

        <span className="text-secondary text-xs">JPG · PNG · WEBP</span>
      </div>

      <label
        htmlFor="fileInput"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();

          const file = event.dataTransfer.files[0];

          if (!file) return;

          handleFile(file);
        }}
        className="w-full h-160 bg-[#08090a] border border-dashed
        border-secondary/30 rounded-lg hover:border-secondary/40
        hover:bg-[#08090a]/75 transition-colors duration-200 overflow-hidden cursor-pointer"
      >
        <input
          type="file"
          id="fileInput"
          className="w-full h-full hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];

            if (!file) return;

            handleFile(file);
          }}
        />

        {imageUrl ? (
          <div className="w-full h-full flex items-center justify-center p-4 bg-[#08090a]">
            <img
              src={imageUrl}
              alt={selectedFile?.name ?? "Selected image"}
              className="max-w-full max-h-full w-auto h-auto object-contain rounded-md select-none"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-y-4 h-full">
            <span
              className="text-secondary bg-box rounded-lg border
              border-secondary/20 w-14 h-14 flex items-center justify-center"
            >
              <LucideUpload className="w-5 h-5" />
            </span>

            <span className="text-white font-medium">Drop an image here</span>

            <span className="text-secondary text-xs tracking-wider">
              or click to browse from your device
            </span>

            <span className="text-secondary text-[11px] tracking-wider">
              Maximum file size: <span className="text-primary">20 MB</span>
            </span>

            {error && (
              <span
                className="text-red-400 font-medium text-xs text-center px-4 py-2 rounded-lg
               bg-red-500/5 border border-red-500/10 mx-2"
              >
                {error}
              </span>
            )}
          </div>
        )}
      </label>

      {selectedFile && (
        <div className="flex items-center justify-between">
          <span className="text-ec text-xs font-bold tracking-wider">
            {selectedFile.name}
          </span>

          <span className="text-secondary text-xs">
            {(selectedFile.size / 1024).toFixed(2)} KB .{" "}
            {selectedFile.type.split("/")[1].toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
}
