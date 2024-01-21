"use client";

import { RecoilRoot, useSetRecoilState } from "recoil";
import { Dropzone } from "./dropzone";

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

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { profileIdState } from "@/store/store";
import { Progress } from "./ui/progress";
import { UploadVideoDialog } from "./video-upload-dialog-components/upload-video-dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { SetTitleDialog } from "./video-upload-dialog-components/set-title-dialog";
import { SetOptionsDialog } from "./video-upload-dialog-components/set-options-dialog";

type VideoUploadProps = {
  profileId: string;
};

export const VideoUpload = ({ profileId }: VideoUploadProps) => {
  const [pageNo, setPageNo] = useState(0);
  return (
    <RecoilRoot>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="premium">Upload Video</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[640px] sm:max-h-[640px]">
          <DialogHeader>
            <DialogTitle>Upload video</DialogTitle>
            <DialogDescription>Upload video for transcoding</DialogDescription>
          </DialogHeader>
          {pageNo == 0 ? (
            <div>
              <UploadVideoDialog profileId={profileId} />
            </div>
          ) : pageNo == 1 ? (
            <div>
              <SetTitleDialog />
            </div>
          ) : (
            <div>
              <SetOptionsDialog />
            </div>
          )}

          <DialogFooter
            className={cn("flex justify-between sm:justify-between")}
          >
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
            >
              {pageNo < 2 ? "Next" : "Transcode"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </RecoilRoot>
  );
};
