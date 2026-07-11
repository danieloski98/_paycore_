"use client";

import { useEffect, useState } from "react";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/kibo-ui/dropzone";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useUploadImage } from "@/hooks/use-upload";
import { LucideIcon } from "lucide-react";

interface FileUploadProps {
  title: string;
  description: string;
  icon: LucideIcon;
  accept: Record<string, string[]>;
  maxSize?: number;
  maxFiles?: number;
  preview?: boolean;
  onUpload: (url: string) => void;
}

export default function FileUpload({
  title,
  description,
  icon: Icon,
  accept,
  maxSize = 2 * 1024 * 1024,
  maxFiles = 1,
  preview = false,
  onUpload,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
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

    if (!file) return;

    setFiles(acceptedFiles);

    if (preview && file.type.startsWith("image")) {
      setPreviewUrl(URL.createObjectURL(file));
    }

    mutate(file, {
      onSuccess: (response) => {
        toast.success("Upload successful");

        onUpload(response.data.data.url);
      },

      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ??
            "Unable to upload file."
        );
      },
    });
  };

  return (
    <Dropzone
      accept={accept}
      maxFiles={maxFiles}
      maxSize={maxSize}
      onDrop={handleDrop}
      src={files}
      className="w-full"
    >
      <DropzoneEmptyState>
        <div className="flex flex-col items-center justify-center gap-3 py-6 cursor-pointer">
          <Icon className="size-8 text-muted-foreground" />

          <div className="text-center">
            <p className="font-medium">{title}</p>

            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </DropzoneEmptyState>

      <DropzoneContent>
        <div className="flex items-center gap-4 p-2">

          {preview && previewUrl && (
            <div
              className="size-16 rounded-md border bg-cover bg-center"
              style={{
                backgroundImage: `url(${previewUrl})`,
              }}
            />
          )}

          <div className="flex-1">

            <p className="truncate font-medium">
              {files[0]?.name}
            </p>

            <p className="text-sm text-muted-foreground">
              {isPending
                ? "Uploading..."
                : "Click or drag to replace"}
            </p>
          </div>

          {isPending && (
            <Loader2 className="size-5 animate-spin" />
          )}
        </div>
      </DropzoneContent>
    </Dropzone>
  );
}