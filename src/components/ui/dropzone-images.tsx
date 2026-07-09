"use client";

import { useEffect, useState } from "react";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/kibo-ui/dropzone";
import { Upload, UploadIcon } from "lucide-react";
import { useUploadImage } from "@/hooks/use-upload";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const IMAGE_ACCEPT = {
  "image/svg+xml": [".svg"],
  "image/png": [".png"],
  "image/jpeg": [".jpg", ".jpeg"],
};

interface ImageUploadProps {
  onUpload: (file: File) => void;
}

const ImageUpload = ({ onUpload }: ImageUploadProps) => {
  const [files, setFiles] = useState<File[]>();
  const [previewUrl, setPreviewUrl] = useState<string>();

  const { mutate, isPending } = useUploadImage();

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (!file) {
      return;
    }

    setFiles(acceptedFiles);
    setPreviewUrl(URL.createObjectURL(file));
    

    mutate(file, {
      onSuccess: (res) => {
        onUpload(res?.data);
      },
    });
  };

  return (
    <Dropzone
      accept={IMAGE_ACCEPT}
      className="w-full"
      maxFiles={1}
      maxSize={MAX_IMAGE_SIZE}
      onDrop={handleDrop}
      src={files}
    >
      <DropzoneEmptyState>
        <div className="flex flex-col items-center justify-center gap-2 cursor-pointer">
          <UploadIcon size={16} />
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-medium">Upload company logo</p>
            <p className="text-xs text-muted-foreground">
              SVG, PNG, or JPG (max. 2MB)
            </p>
          </div>
        </div>
      </DropzoneEmptyState>
      <DropzoneContent>
        <div className="flex w-full items-center gap-3">
          {previewUrl ? (
            <div
              aria-label="Selected company logo preview"
              className="size-18 shrink-0 rounded-md border bg-muted bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${previewUrl})` }}
            />
          ) : null}
          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-sm font-medium">{files?.[0]?.name}</p>
            <p className="text-xs text-muted-foreground">
              Click or drag to replace. SVG, PNG, or JPG (max. 2MB)
            </p>
          </div>
        </div>
      </DropzoneContent>
    </Dropzone>
  );
};

export default ImageUpload;
