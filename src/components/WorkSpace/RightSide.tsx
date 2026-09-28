import { useState } from "react";
import { ChevronDown, LucideArrowRight, LucideDownload } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface RightSideProps {
  selectedFile: File | null;
  compressedBlob: Blob | null;
  quality: number;
  setQuality: React.Dispatch<React.SetStateAction<number>>;
  isCompressing: boolean;
  format: "JPG" | "PNG" | "WEBP";
  setFormat: React.Dispatch<React.SetStateAction<"JPG" | "PNG" | "WEBP">>;
  onCompress: () => void;
  onDownload: () => void;
}

export default function RightSide({
  selectedFile,
  compressedBlob,
  quality,
  setQuality,
  isCompressing,
  format,
  setFormat,
  onCompress,
  onDownload,
}: RightSideProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formats = ["JPG", "PNG", "WEBP"] as const;

  const originalSize = selectedFile?.size ?? 0;
  const compressedSize = compressedBlob?.size ?? 0;

  const reduction =
    originalSize > 0
      ? ((originalSize - compressedSize) / originalSize) * 100
      : 0;

  return (
    <div
      className="h-fit border py-6 border-secondary/20 rounded-xl bg-box flex
        flex-col gap-y-7"
    >
      <div className="flex items-center justify-between px-6">
        <span className="text-xs text-ec tracking-wider">Compression</span>

        <span className="text-[11px] text-secondary/50">01</span>
      </div>

      <div className="flex flex-col gap-y-5 px-6">
        <div className="flex items-center justify-between">
          <span className="text-secondary text-[11.5px] font-medium">
            Quality
          </span>

          <span className="text-ec text-[11.5px] font-medium">
            {format === "PNG" ? "Lossless" : `${quality}%`}
          </span>
        </div>

        <input
          type="range"
          min={1}
          max={100}
          value={quality}
          disabled={format === "PNG"}
          onChange={(e) => setQuality(Number(e.target.value))}
          className={`range ${
            format === "PNG"
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
        />
      </div>

      <div className="flex flex-col gap-y-4 px-6">
        <span className="text-secondary text-[11.5px] font-medium">
          Output format
        </span>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-full h-10 px-3 border border-secondary/20 rounded-lg
              flex items-center justify-between text-[11.5px] font-medium
              text-ec bg-[#0d0f11] hover:border-secondary/30 transition-colors"
          >
            {format}

            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={15} className="text-secondary" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.98 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute z-10 top-full left-0 right-0 mt-2 p-1
                  border border-secondary/20 rounded-lg bg-[#0d0f11]"
              >
                {formats.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setFormat(item);
                      setIsOpen(false);
                    }}
                    className={`w-full px-3 py-2 rounded-md text-left text-[11.5px]
                      font-medium transition-colors ${
                        format === item
                          ? "text-primary bg-primary/10"
                          : "text-secondary hover:text-ec hover:bg-box"
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <span className="w-full h-px bg-secondary/20"></span>

      <div className="flex items-center justify-between px-6">
        <span className="text-xs text-ec tracking-wider">Result</span>

        <span className="text-[11px] text-secondary/50">02</span>
      </div>

      {selectedFile ? (
        <div className="px-6">
          <div className="grid grid-cols-2 border border-secondary/20 rounded-xl">
            <div className="flex flex-col gap-y-2 px-4 py-4 border-b border-r border-secondary/20">
              <span className="text-[10px] text-secondary tracking-widest uppercase">
                Original
              </span>
              <span className="text-xs text-ec font-bold">
                {(originalSize / 1024).toFixed(2)} KB
              </span>
            </div>

            <div className="flex flex-col gap-y-2 px-4 py-4 border-b border-secondary/20">
              <span className="text-[10px] text-secondary tracking-widest uppercase">
                Estimated
              </span>
              <span className="text-xs text-ec font-bold">
                {compressedBlob
                  ? `${(compressedSize / 1024).toFixed(2)} KB`
                  : "--"}
              </span>
            </div>

            <div className="flex flex-col gap-y-2 px-4 py-4 border-r border-secondary/20">
              <span className="text-[10px] text-secondary tracking-widest uppercase">
                Reduction
              </span>
              <span className="text-xs text-primary font-bold">
                {compressedBlob ? `${reduction.toFixed(0)}%` : "--"}
              </span>
            </div>

            <div className="flex flex-col gap-y-2 px-4 py-4">
              <span className="text-[10px] text-secondary tracking-widest uppercase">
                Format
              </span>
              <span className="text-xs text-ec font-bold">{format}</span>
            </div>
          </div>
        </div>
      ) : (
        <span className="text-[11.5px] text-secondary px-6 tracking-wider">
          Upload an image to calculate compression results.
        </span>
      )}

      <div className="flex flex-col gap-y-3 px-6">
        <button
          type="button"
          disabled={!selectedFile || isCompressing}
          onClick={onCompress}
          className={`text-xs text-ec bg-primary font-semibold
          flex items-center justify-center gap-x-2 p-4 rounded-lg
          transition-colors duration-200
          ${
            selectedFile && !isCompressing
              ? "opacity-100 cursor-pointer hover:bg-[#8f53f6]"
              : "opacity-50 cursor-not-allowed"
          }`}
        >
          <LucideArrowRight className="w-4 h-4" />

          {isCompressing ? "Compressing..." : "Compress image"}
        </button>

        <button
          type="button"
          disabled={!compressedBlob}
          onClick={onDownload}
          className={`text-xs text-ec/70 bg-transparent font-semibold border border-secondary/20
          flex items-center justify-center gap-x-2 p-4 rounded-lg transition-colors duration-200
          ${
            compressedBlob
              ? "opacity-100 cursor-pointer hover:border-secondary/30 hover:text-ec"
              : "opacity-50 cursor-not-allowed"
          }`}
        >
          <LucideDownload className="w-4 h-4" />
          Download
        </button>
      </div>

      <span className="w-full h-px bg-secondary/20"></span>

      <div className="flex items-center justify-between px-6">
        <span className="text-xs text-ec tracking-wider">Processing</span>

        <span className="text-[11px] text-secondary/50">03</span>
      </div>

      <span className="text-[11.5px] text-secondary px-6 tracking-wider">
        Images are processed locally in your browser. Your files are not
        uploaded to a server.
      </span>
    </div>
  );
}
