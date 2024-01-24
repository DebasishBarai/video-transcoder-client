import { profileIdState } from "@/store/store";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Dropzone } from "../dropzone";
import { Progress } from "../ui/progress";

export const UploadVideoDialog = () => {
  const profileId = useRecoilValue(profileIdState);
  return (
    <div>
      <div className="grid gap-4 py-4">
        <Dropzone profileId={profileId ? profileId : ""} />
      </div>
      <Progress className="h-2" value={50} />
    </div>
  );
};
