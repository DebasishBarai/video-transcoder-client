"use client";

import { RecoilRoot } from "recoil";
import { VideoUpload } from "./video-upload";

type VideoUploadRecoilProps = {
  profileId: string;
};

export const VideoUploadRecoil = ({ profileId }: VideoUploadRecoilProps) => {
  return (
    <RecoilRoot>
      <VideoUpload profileId={profileId} />
    </RecoilRoot>
  );
};
