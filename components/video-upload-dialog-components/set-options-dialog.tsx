import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { useRecoilValue } from "recoil";
import {
  outputDefaultFormatState,
  outputDefaultResolutionState,
} from "@/store/store";

export const SetOptionsDialog = () => {
  const outputFormats = useRecoilValue(outputDefaultFormatState);
  const outputResolutions = useRecoilValue(outputDefaultResolutionState);
  return (
    <div className="grid grid-cols-2">
      <div className={cn("m-4 p-4 box-border space-y-4")}>
        <h1 className={cn("p-4 pl-0")}>Format</h1>
        {outputFormats.map((format) => (
          <div key={format} className="flex items-center space-x-2">
            <Checkbox id={format} defaultChecked={true} />
            <label
              htmlFor={format}
              className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              )}
            >
              {format}
            </label>
          </div>
        ))}
      </div>
      <div className={cn("m-4 p-4 box-border space-y-4")}>
        <h1 className={cn("p-4 pl-0")}>Resolutions</h1>
        {outputResolutions.map((resolution) => (
          <div key={resolution} className="flex items-center space-x-2">
            <Checkbox id={resolution} defaultChecked={true} />
            <label
              htmlFor={resolution}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {resolution}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
