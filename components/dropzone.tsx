"use client";

import { prisma } from "@/lib/prisma";
import { fileState, fileTypeState } from "@/store/store";
import axios from "axios";
import { UploadCloud } from "lucide-react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

type DropzoneProps = {
  profileId: string;
};

export const Dropzone = ({ profileId }: DropzoneProps) => {
  const [file, setFile] = useRecoilState(fileState);
  const fileType = useRecoilValue(fileTypeState);

  const onDrop = async (files: any) => {
    setFile(files[0]);

    const videoRes = await axios.post("/api/createVideo", {
      title: "Video title",
      description: "video description",
    });

    if (videoRes.status != 200) {
      return;
    }

    console.log("create video route returned ", videoRes);

    const videoId = videoRes.data.videoId;

    //get S3 presigned url
    const res = await axios.post("/api/aws/putVideoPresignedUrl", {
      videoId,
      fileType,
    });

    console.log("put video presigned url route returned ", res);

    if (res.status != 200) {
      return;
    }

    //save file to S3
    const options = {
      headers: {
        "Content-Type": fileType,
      },
    };

    await axios.put(res.data.putObjectPreSignedUrl, file, options);
  };
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
