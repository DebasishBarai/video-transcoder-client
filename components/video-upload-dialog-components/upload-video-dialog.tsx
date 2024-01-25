import { videoUploadProgressState, videoUploadingState } from "@/store/store";
import { useRecoilValue } from "recoil";
import { Dropzone } from "../dropzone";
import { Progress } from "../ui/progress";

export const UploadVideoDialog = () => {
  const uploading = useRecoilValue(videoUploadingState);
  const uploadProgress = useRecoilValue(videoUploadProgressState);

  return (
    <div>
      {uploading ? (
        <Progress className="h-2" value={uploadProgress} />
      ) : (
        <div className="grid gap-4 py-4">
          <Dropzone />
        </div>
      )}
    </div>
  );
};
