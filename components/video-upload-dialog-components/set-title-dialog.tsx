import { cn } from "@/lib/utils";
import { videoDescriptionState, videoTitleState } from "@/store/store";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export const SetTitleDialog = () => {
  const [title, setTitle] = useRecoilState(videoTitleState);
  const [description, setDescription] = useRecoilState(videoDescriptionState);
  return (
    <div>
      <div className={cn("m-4 p-4 box-border")}>
        <h1 className={cn("p-4 pl-0")}>Title</h1>
        <Input
          className={cn(
            "p-2 h-fit w-full rounded-sm border-[2px] placeholder:opacity-50 focus:placeholder:opacity-100 outline-none",
          )}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Set title of your video"
        />
      </div>
      <div className={cn("m-4 p-4 box-border")}>
        <h1 className={cn("p-4 pl-0")}>Description</h1>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write a brief description of your video (optional)"
        />
      </div>
    </div>
  );
};
