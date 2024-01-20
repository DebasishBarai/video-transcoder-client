"use client";

import { RecoilRoot } from "recoil";
import { Dropzone } from "./dropzone";

type VideoUploadProps = {
  profileId: string;
};

export const VideoUpload = ({ profileId }: VideoUploadProps) => {
  return (
    <RecoilRoot>
      <Dropzone profileId={profileId} />
    </RecoilRoot>
  );
};
