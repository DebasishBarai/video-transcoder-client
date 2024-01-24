"use client";

import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { SetOptionsDialog } from "./video-upload-dialog-components/set-options-dialog";
import { SetTitleDialog } from "./video-upload-dialog-components/set-title-dialog";
import { UploadVideoDialog } from "./video-upload-dialog-components/upload-video-dialog";
import { profileIdState, videoTitleState } from "@/store/store";

type VideoUploadProps = {
  profileId: string;
};

export const VideoUpload = ({ profileId }: VideoUploadProps) => {
  const setProfileId = useSetRecoilState(profileIdState);

  setProfileId(profileId);

  const title = useRecoilValue(videoTitleState);

  const [pageNo, setPageNo] = useState(0);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="premium">Upload Video</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[640px] sm:max-h-[640px]">
        {pageNo == 0 ? (
          <DialogHeader>
            <DialogTitle>Set Title and Description</DialogTitle>
            <DialogDescription>
              Set Title and Description of your video
            </DialogDescription>
          </DialogHeader>
        ) : pageNo == 1 ? (
          <DialogHeader>
            <DialogTitle>Transcode options</DialogTitle>
            <DialogDescription>
              Select formats and resolutions in which you want your video to be
              transcoded
            </DialogDescription>
          </DialogHeader>
        ) : (
          <DialogHeader>
            <DialogTitle>Upload video</DialogTitle>
            <DialogDescription>Upload video for transcoding</DialogDescription>
          </DialogHeader>
        )}
        {pageNo == 0 ? (
          <div>
            <SetTitleDialog />
          </div>
        ) : pageNo == 1 ? (
          <div>
            <SetOptionsDialog />
          </div>
        ) : (
          <div>
            <UploadVideoDialog />
          </div>
        )}

        <DialogFooter className={cn("flex justify-between sm:justify-between")}>
          {/* <Button type="submit">Save changes</Button> */}
          <Button
            onClick={() => setPageNo((c) => c - 1)}
            disabled={pageNo == 0 ? true : false}
          >
            Previous
          </Button>
          <Button
            onClick={
              pageNo < 2
                ? () => setPageNo((c) => c + 1)
                : () => setPageNo((c) => c)
            }
            variant={pageNo < 2 ? "default" : "premium"}
            disabled={pageNo == 0 && title === "" ? true : false}
          >
            {pageNo < 2 ? "Next" : "Transcode"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
