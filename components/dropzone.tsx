"use client";

import { UploadCloud } from "lucide-react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export const Dropzone = () => {
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "video/mp4": [".mp4"],
      "video/mpeg": [".mpeg"],
    },
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className="bg-slate-800 border-white rounded-lg hover:cursor-pointer focus-visible:ring-0 text-slate-50 focus-visible:ring-offset-0 flex flex-col justify-center items-center m-4 p-4"
      >
        <input {...getInputProps()} />
        <UploadCloud className="h-10 w-10 fill-grey-200 stroke-grey-400" />
        <p>Drag and drop some files here, or click to select files</p>
      </div>
    </div>
  );
};
