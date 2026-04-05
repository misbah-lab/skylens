import { useCallback, useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  onImageUploaded: (file: File, imageUrl: string) => void;
  isAnalyzing: boolean;
}

const ImageUpload = ({ onImageUploaded, isAnalyzing }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const url = URL.createObjectURL(file);
      onImageUploaded(file, url);
    },
    [onImageUploaded]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      className={`
        relative border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 cursor-pointer
        ${isDragging ? "border-primary bg-primary/10 scale-[1.02]" : "border-border hover:border-primary/50 hover:bg-muted/30"}
        ${isAnalyzing ? "pointer-events-none opacity-50" : ""}
      `}
    >
      <input
        type="file"
        accept="image/*"
        onChange={onFileSelect}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={isAnalyzing}
      />
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          {isDragging ? <ImageIcon className="w-8 h-8 text-primary" /> : <Upload className="w-8 h-8 text-primary" />}
        </div>
        <div>
          <p className="text-lg font-display font-medium text-foreground">
            {isDragging ? "Drop your night sky photo" : "Upload a night sky photo"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">Drag & drop or click to browse · JPG, PNG, WebP</p>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
