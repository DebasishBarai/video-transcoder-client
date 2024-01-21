import { profileIdState } from "@/store/store";
import { useSetRecoilState } from "recoil";
import { Dropzone } from "../dropzone";
import { Progress } from "../ui/progress";

type UploadVideoProps = {
  profileId: string;
};

export const UploadVideoDialog = ({ profileId }: UploadVideoProps) => {
  const setProfileId = useSetRecoilState(profileIdState);

  setProfileId(profileId);
  return (
    <div>
      <div className="grid gap-4 py-4">
        <Dropzone profileId={profileId ? profileId : ""} />
      </div>
      <Progress className="h-2" value={50} />
    </div>
  );
};
