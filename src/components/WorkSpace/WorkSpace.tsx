import { useState } from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

export default function WorkSpace() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [quality, setQuality] = useState<number>(80);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [format, setFormat] = useState<"JPG" | "PNG" | "WEBP">("JPG");

  const imageType =
    format === "JPG" ? "image/jpeg" : `image/${format.toLowerCase()}`;

  const handleCompress = () => {
    if (!selectedFile) return;

    setIsCompressing(true);

    const imageUrl = URL.createObjectURL(selectedFile);

    const image = new Image();

    image.src = imageUrl;

    image.onload = () => {
      const canvas = document.createElement("canvas");

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        setIsCompressing(false);
        URL.revokeObjectURL(imageUrl);
        return;
      }

      ctx.drawImage(image, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setIsCompressing(false);
            URL.revokeObjectURL(imageUrl);
            return;
          }

          setCompressedBlob(blob);
          setIsCompressing(false);

          URL.revokeObjectURL(imageUrl);
        },
        imageType,
        quality / 100,
      );
    };
  };

  const handleDownload = () => {
    if (!compressedBlob || !selectedFile) return;

    const lastDotIndex = selectedFile?.name.lastIndexOf(".");

    const fileName =
      lastDotIndex !== -1
        ? selectedFile?.name.slice(0, lastDotIndex)
        : selectedFile?.name;

    const type = format.toLowerCase();

    const url = URL.createObjectURL(compressedBlob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `${fileName}.${type}`;

    link.click();

    URL.revokeObjectURL(url);
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setCompressedBlob(null);
  };

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-4">
      <LeftSide selectedFile={selectedFile} onFileSelect={handleFileSelect} />

      <RightSide
        selectedFile={selectedFile}
        compressedBlob={compressedBlob}
        quality={quality}
        setQuality={setQuality}
        isCompressing={isCompressing}
        format={format}
        setFormat={setFormat}
        onCompress={handleCompress}
        onDownload={handleDownload}
      />
    </div>
  );
}
